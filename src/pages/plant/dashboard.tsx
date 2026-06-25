import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Factory, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { usePlantStore } from "@/stores/plant-store";

const STATUS_COLORS = {
  'Done': 'var(--color-primary)',
  'Completed': 'var(--color-primary)',
  'In Progress': 'var(--color-status-in-progress)',
  'Pending': 'var(--color-status-pending)',
  'Stuck': 'var(--color-status-overdue)',
  'Need Support': 'var(--color-status-overdue)',
};

export function PlantDashboard() {
  const navigate = useNavigate();
  const { jobs, wamEntries } = usePlantStore();

  // Calculate KPIs
  const allJobsCount = jobs.length;
  const doneCount = jobs.filter(j => j.status === 'Done' || j.dispatch === 'Completed').length;
  const inProgressCount = jobs.filter(j => j.status === 'Pending' || j.status === 'In Progress').length;
  const stuckCount = jobs.filter(j => j.status === 'Stuck' || j.status === 'Need Support').length;

  // Pie chart data
  const pieData = [
    { name: 'Done', value: doneCount, color: 'var(--color-primary)' },
    { name: 'In Progress / Pending', value: inProgressCount, color: 'var(--color-status-in-progress)' },
    { name: 'Stuck / Delayed', value: stuckCount, color: 'var(--color-status-overdue)' }
  ].filter(d => d.value > 0);

  // Bar chart data (WAM Tasks per employee)
  const employeeTasks: Record<string, number> = {};
  wamEntries.forEach(entry => {
    employeeTasks[entry.employee] = (employeeTasks[entry.employee] || 0) + 1;
  });
  
  const barData = Object.entries(employeeTasks).map(([name, count]) => ({
    name,
    tasks: count,
  }));

  const navToTracking = () => navigate("/plant/tracking");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Plant Team Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of shop-floor activity and planned tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={navToTracking}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">All Tracked Jobs</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allJobsCount}</div>
            <p className="text-xs text-muted-foreground">Total on shop floor</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={navToTracking}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Done & Dispatched</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{doneCount}</div>
            <p className="text-xs text-muted-foreground">Completed successfully</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={navToTracking}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress / Pending</CardTitle>
            <Clock className="h-4 w-4 text-status-in-progress" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-in-progress">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">Active in Assembly/Testing</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={navToTracking}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stuck / Delayed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-status-overdue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-overdue">{stuckCount}</div>
            <p className="text-xs text-muted-foreground">Past target dispatch date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Current Shop Floor Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No active jobs tracking data.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Plant Team WAM (This Week)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip cursor={{ fill: 'var(--color-muted)' }} />
                  <Bar dataKey="tasks" name="Planned Tasks" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                No WAM entries planned for this week.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
