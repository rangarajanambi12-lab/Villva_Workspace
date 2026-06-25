import { useState } from "react";
import { useAppEnggStore, WorkStatus } from "@/stores/app-engg-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

const STATUS_COLORS: Record<string, string> = {
  'Not Started': 'bg-muted text-muted-foreground hover:bg-muted/80',
  'In Progress': 'bg-status-in-progress/20 text-status-in-progress hover:bg-status-in-progress/30',
  'On Hold': 'bg-status-overdue/20 text-status-overdue hover:bg-status-overdue/30',
  'Completed': 'bg-primary/20 text-primary hover:bg-primary/30',
};

const PRIORITY_COLORS: Record<string, string> = {
  'High': 'text-status-overdue',
  'Medium': 'text-status-in-progress',
  'Low': 'text-muted-foreground',
};

export function GeneralWorkPage() {
  const { generalWork, updateWorkStatus } = useAppEnggStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredWork = generalWork.filter((work) => {
    const matchesSearch = 
      work.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.assignedEngineer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || work.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">General Work</h1>
        <p className="text-muted-foreground">
          Manage and track internal work assignments, tasks, and project activities.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Work Items</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              placeholder="Search tasks or engineers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Task ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Assigned Engineer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[140px]">Change Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWork.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                      No work items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWork.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((work) => (
                    <TableRow key={work.id}>
                      <TableCell className="font-medium whitespace-nowrap">{work.taskId}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={work.description}>{work.description}</TableCell>
                      <TableCell>{work.assignedEngineer}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${PRIORITY_COLORS[work.priority] || ''}`}>
                          {work.priority}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{work.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden max-w-[60px]">
                            <div 
                              className={`h-full ${work.progress === 100 ? 'bg-primary' : 'bg-status-in-progress'}`} 
                              style={{ width: `${work.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{work.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-transparent whitespace-nowrap ${STATUS_COLORS[work.status] || STATUS_COLORS['Not Started']}`}>
                          {work.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={work.status} 
                          onValueChange={(val) => updateWorkStatus(work.id, val as WorkStatus)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not Started">Not Started</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
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
