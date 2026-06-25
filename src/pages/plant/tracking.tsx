import { useState } from "react";
import { usePlantStore, JobStatus } from "@/stores/plant-store";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format, startOfWeek, endOfWeek } from "date-fns";

const STATUS_COLORS: Record<string, string> = {
  'Done': 'bg-primary/20 text-primary hover:bg-primary/30',
  'Completed': 'bg-primary/20 text-primary hover:bg-primary/30',
  'In Progress': 'bg-status-in-progress/20 text-status-in-progress hover:bg-status-in-progress/30',
  'Planned': 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30',
  'Pending': 'bg-status-pending/20 text-status-pending hover:bg-status-pending/30',
  'Missed': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Overdue': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Need Support': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Blocked': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Stuck': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
};

export function PlantTracking() {
  const { jobs, addJob, updateJobStatus } = usePlantStore();
  const { user } = useAuthStore();

  const handleAddEntry = () => {
    const taskName = window.prompt("Task name for entry?");
    if (!taskName) return;

    const employeeName = window.prompt("Employee name for entry?", user?.name || "Employee");
    if (!employeeName) return;

    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 1 });
    const end = endOfWeek(today, { weekStartsOn: 1 });
    const weekRange = `${format(start, 'dd MMM yyyy')} - ${format(end, 'dd MMM yyyy')}`;

    addJob({
      jobNo: '-',
      customer: '-',
      assembly: 'Pending',
      testing: 'Pending',
      dispatch: 'Pending',
      targetDate: '-',
      weekRange,
      day: '',
      employee: employeeName,
      task: taskName,
      description: '',
      status: 'Pending'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Plant Team Tracking</h1>
          <p className="text-muted-foreground">
            Production & Plant Team Work Tracking (SCM)
          </p>
        </div>
        <Button onClick={handleAddEntry} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add Entry
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Production Tracking List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[180px]">Week</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Task / Job No.</TableHead>
                  <TableHead>Description / Customer</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[140px]">Change Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No tracking entries found. Add a new entry to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.weekRange}</TableCell>
                      <TableCell>{job.day}</TableCell>
                      <TableCell>{job.employee}</TableCell>
                      <TableCell>{job.task || job.jobNo}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={job.description || job.customer}>
                        {job.description || job.customer}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-transparent ${STATUS_COLORS[job.status] || STATUS_COLORS['Pending']}`}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={job.status} 
                          onValueChange={(val) => updateJobStatus(job.id, val as JobStatus)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Stuck">Stuck</SelectItem>
                            <SelectItem value="Need Support">Need Support</SelectItem>
                            <SelectItem value="Planned">Planned</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
