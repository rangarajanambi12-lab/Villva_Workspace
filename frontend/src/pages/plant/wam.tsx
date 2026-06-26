import { useState } from "react";
import { usePlantStore } from "@/stores/plant-store";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Send } from "lucide-react";
import { format, startOfWeek, endOfWeek } from "date-fns";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PLANT_EMPLOYEES = ["Sneha Pillai", "Selvaraj", "Sivakumar", "Rajesh", "ACS", "Gopinath", "Parthipan"];

export function PlantWam() {
  const { user } = useAuthStore();
  const { wamEntries, addWamEntry, deleteWamEntry, triggerWamToTracking } = usePlantStore();
  
  const today = new Date();
  const currentDayName = format(today, 'EEEE');
  const defaultDay = DAYS.includes(currentDayName) ? currentDayName : "Monday";
  
  const [formData, setFormData] = useState({
    weekStart: format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"),
    weekEnd: format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd"),
    employee: user?.name || "Sneha Pillai",
    day: defaultDay,
    task: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.weekStart || !formData.weekEnd || !formData.task.trim()) {
      alert("Week dates and task name are required.");
      return;
    }
    
    addWamEntry({
      weekStart: format(new Date(formData.weekStart), 'dd MMM yyyy'),
      weekEnd: format(new Date(formData.weekEnd), 'dd MMM yyyy'),
      employee: formData.employee,
      day: formData.day,
      task: formData.task,
      description: formData.description,
    });

    setFormData((prev) => ({
      ...prev,
      day: defaultDay,
      task: "",
      description: "",
    }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this WAM entry?")) {
      deleteWamEntry(id);
    }
  };

  const handleTrigger = () => {
    if (wamEntries.length === 0) {
      alert("No WAM entries to trigger.");
      return;
    }
    if (window.confirm(`Trigger ${wamEntries.length} WAM entries to Plant Team Tracking?`)) {
      triggerWamToTracking();
      alert(`Triggered ${wamEntries.length} entries to Plant Team Tracking.`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">My WAM</h1>
        <p className="text-muted-foreground">
          Work Allocation Matrix — Plan and submit weekly tasks.
        </p>
      </div>

      <Tabs defaultValue="submit">
        <TabsList>
          <TabsTrigger value="submit">Submit Weekly Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="submit" className="space-y-6 mt-4">
          
          <Card>
            <CardHeader>
              <CardTitle>Add My Weekly Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="weekStart">Week Start Date</Label>
                  <Input 
                    id="weekStart" 
                    type="date" 
                    value={formData.weekStart}
                    onChange={(e) => handleChange("weekStart", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weekEnd">Week End Date</Label>
                  <Input 
                    id="weekEnd" 
                    type="date" 
                    value={formData.weekEnd}
                    onChange={(e) => handleChange("weekEnd", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Employee</Label>
                  <Select value={formData.employee} onValueChange={(val) => handleChange("employee", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLANT_EMPLOYEES.map(emp => (
                        <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Day</Label>
                  <Select value={formData.day} onValueChange={(val) => handleChange("day", val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="task">Task Name</Label>
                  <Input 
                    id="task" 
                    placeholder="e.g. Assembly tracking" 
                    value={formData.task}
                    onChange={(e) => handleChange("task", e.target.value)}
                  />
                </div>
                <div className="space-y-2 lg:col-span-3">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input 
                    id="description" 
                    placeholder="e.g. Gather components and begin assembly" 
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </div>
                <div className="lg:col-span-3 flex justify-end mt-2">
                  <Button type="submit">Submit WAM Entry</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Weekly Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Week</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[80px] text-center">Act</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wamEntries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                          No WAM entries submitted yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      wamEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {entry.weekStart} - {entry.weekEnd}
                          </TableCell>
                          <TableCell>{entry.day}</TableCell>
                          <TableCell>{entry.employee}</TableCell>
                          <TableCell>{entry.task}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={entry.description}>
                            {entry.description}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-muted-foreground hover:text-destructive h-8 w-8"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {wamEntries.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" onClick={handleTrigger} className="border-primary/50 hover:bg-primary/10 hover:text-primary">
                    <Send className="w-4 h-4 mr-2" />
                    Trigger
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  );
}
