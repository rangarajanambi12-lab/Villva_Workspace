import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useCustomerStore } from "@/stores/customer-store";
import { Target, CheckCircle2, Clock, XCircle, Award } from "lucide-react";

const trendData = [
  { name: 'Mon', completed: 2, pending: 4, missed: 0 },
  { name: 'Tue', completed: 4, pending: 3, missed: 1 },
  { name: 'Wed', completed: 6, pending: 2, missed: 0 },
  { name: 'Thu', completed: 5, pending: 5, missed: 1 },
  { name: 'Fri', completed: 8, pending: 1, missed: 0 },
  { name: 'Sat', completed: 3, pending: 2, missed: 2 },
];

const mockSparklines = {
  total: [{value: 5}, {value: 8}, {value: 12}, {value: 15}, {value: 22}, {value: 28}, {value: 33}],
  completed: [{value: 2}, {value: 4}, {value: 8}, {value: 11}, {value: 16}, {value: 22}, {value: 25}],
  pending: [{value: 3}, {value: 4}, {value: 4}, {value: 4}, {value: 6}, {value: 6}, {value: 5}],
  missed: [{value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 0}, {value: 3}],
};

export function SalesDashboard() {
  const { customers } = useCustomerStore();
  
  const totalCount = customers.length;
  const completedCount = customers.filter(c => c.status === 'completed').length;
  const pendingCount = customers.filter(c => c.status === 'pending' || c.status === 'active').length;
  const missedCount = customers.filter(c => c.status === 'missed').length;

  const performancePercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Sales Dashboard</h1>
        <p className="text-muted-foreground">
          Monthly overview and weekly customer activity metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Total"
          value={totalCount}
          description="All entries this month"
          sparklineData={mockSparklines.total}
          sparklineColor="var(--color-primary)"
        />
        <StatCard
          title="Completed"
          value={completedCount}
          description="With feedback submitted"
          sparklineData={mockSparklines.completed}
          sparklineColor="var(--color-status-completed)"
          valueClassName="text-status-completed"
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          description="Awaiting feedback"
          sparklineData={mockSparklines.pending}
          sparklineColor="var(--color-status-pending)"
          valueClassName="text-status-pending"
        />
        <StatCard
          title="Missed"
          value={missedCount}
          description="Not contacted"
          sparklineData={mockSparklines.missed}
          sparklineColor="var(--color-status-missed)"
          valueClassName="text-status-missed"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Summary</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold flex items-center gap-2 mt-2">
              <span className="text-status-completed">+{completedCount} Completed</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-status-pending">{pendingCount} Pending</span>
            </div>
            <div className="text-sm text-status-missed mt-1">{missedCount} Missed</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">{performancePercent}%</div>
            <p className="text-xs text-muted-foreground mt-1">% of activities completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Day</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">Friday</div>
            <p className="text-xs text-muted-foreground mt-1">8 Activities Completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="completed" name="Completed" stroke="var(--color-status-completed)" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" name="Pending" stroke="var(--color-status-pending)" strokeWidth={2} />
              <Line type="monotone" dataKey="missed" name="Missed" stroke="var(--color-status-missed)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
