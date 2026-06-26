import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, AlertTriangle, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useAppEnggStore } from "@/stores/app-engg-store";

export function AppEngDashboard() {
  const navigate = useNavigate();
  const { pendingEnquiries, quotations } = useAppEnggStore();

  const pendingEnquiryCount = pendingEnquiries.filter(e => e.status === 'Pending').length;
  const pendingQuotationsCount = quotations.filter(q => q.status === 'Draft' || q.status === 'Sent').length;
  const delayedEnquiryCount = pendingEnquiries.filter(e => e.ageDays > 7 && e.status !== 'Responded').length;
  const pendingOwnershipCount = pendingEnquiries.filter(e => !e.assignedEngineer && e.status !== 'Responded').length;

  // Mock monthly data for the line chart since we don't have historical data in the store yet
  const lineData = [
    { month: 'Jan', enquiries: 45 },
    { month: 'Feb', enquiries: 52 },
    { month: 'Mar', enquiries: 48 },
    { month: 'Apr', enquiries: 61 },
    { month: 'May', enquiries: 59 },
    { month: 'Jun', enquiries: pendingEnquiries.length },
  ];

  // Quotation status distribution data
  const statusCounts = quotations.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = [
    { status: 'Draft', count: statusCounts['Draft'] || 0, fill: '#94a3b8' },
    { status: 'Sent', count: statusCounts['Sent'] || 0, fill: '#3b82f6' },
    { status: 'Accepted', count: statusCounts['Accepted'] || 0, fill: '#10b981' },
    { status: 'Rejected', count: statusCounts['Rejected'] || 0, fill: '#ef4444' },
    { status: 'Expired', count: statusCounts['Expired'] || 0, fill: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Application Engineer Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of enquiries, quotations, and pending engineering work.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/app-engineer/pending-enquiry")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Enquiries</CardTitle>
            <Clock className="h-4 w-4 text-status-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-pending">{pendingEnquiryCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/app-engineer/quotations")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotations</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingQuotationsCount}</div>
            <p className="text-xs text-muted-foreground">Draft or Sent status</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/app-engineer/pending-enquiry")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Enquiries</CardTitle>
            <AlertTriangle className="h-4 w-4 text-status-overdue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-overdue">{delayedEnquiryCount}</div>
            <p className="text-xs text-muted-foreground">Older than 7 days</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => navigate("/app-engineer/pending-enquiry")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Ownership</CardTitle>
            <UserMinus className="h-4 w-4 text-status-in-progress" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-in-progress">{pendingOwnershipCount}</div>
            <p className="text-xs text-muted-foreground">Unassigned enquiries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Pending Enquiries Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="enquiries" name="Pending Enquiries" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quotation Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="status" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'var(--color-muted)' }} />
                <Bar dataKey="count" name="Quotations" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Add Cell import missing from recharts
import { Cell } from "recharts";
