import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, AlertTriangle, Briefcase, FileText } from "lucide-react";
import { useAppEnggStore } from "@/stores/app-engg-store";

export function AppEngReportsPage() {
  const { pendingEnquiries, generalWork, quotations } = useAppEnggStore();

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportEnquiries = () => {
    if (pendingEnquiries.length === 0) return alert("No data available.");
    const headers = ["Reference", "Customer", "Product", "Status", "Age (Days)", "Assigned Engineer", "Last Update"];
    const rows = pendingEnquiries.map(e => [
      e.reference, e.customer, e.product, e.status, e.ageDays, e.assignedEngineer || "Unassigned", e.lastUpdate
    ].map(v => `"${v}"`).join(","));
    downloadCSV([headers.join(","), ...rows].join("\n"), "pending-enquiries-report.csv");
  };

  const handleExportQuotations = () => {
    if (quotations.length === 0) return alert("No data available.");
    const headers = ["Quote ID", "Customer", "Amount", "Status", "Created Date", "Expected Close Date"];
    const rows = quotations.map(q => [
      q.quoteId, q.customer, q.amount, q.status, q.createdDate, q.expectedCloseDate
    ].map(v => `"${v}"`).join(","));
    downloadCSV([headers.join(","), ...rows].join("\n"), "quotation-status-report.csv");
  };

  const handleExportDelayed = () => {
    const delayed = pendingEnquiries.filter(e => e.ageDays > 7);
    if (delayed.length === 0) return alert("No delayed enquiries found.");
    const headers = ["Reference", "Customer", "Product", "Days Delayed", "Assigned Engineer", "Last Contact"];
    const rows = delayed.map(e => [
      e.reference, e.customer, e.product, e.ageDays, e.assignedEngineer || "Unassigned", e.lastUpdate
    ].map(v => `"${v}"`).join(","));
    downloadCSV([headers.join(","), ...rows].join("\n"), "delayed-enquiries-report.csv");
  };

  const handleExportWork = () => {
    if (generalWork.length === 0) return alert("No data available.");
    const headers = ["Task ID", "Description", "Assigned Engineer", "Status", "Priority", "Due Date", "Progress (%)"];
    const rows = generalWork.map(w => [
      w.taskId, w.description, w.assignedEngineer, w.status, w.priority, w.dueDate, w.progress
    ].map(v => `"${v}"`).join(","));
    downloadCSV([headers.join(","), ...rows].join("\n"), "general-work-report.csv");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Reports</h1>
        <p className="text-muted-foreground">
          Generate analytical summaries and data exports for operational insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <CardTitle>Pending Enquiry Report</CardTitle>
            <CardDescription>
              Lists all pending customer enquiries with age and assignment details.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full sm:w-auto" onClick={handleExportEnquiries}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <CardTitle>Quotation Status Report</CardTitle>
            <CardDescription>
              Shows quotation distribution by status, amount, and close dates.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full sm:w-auto" variant="outline" onClick={handleExportQuotations}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-status-overdue/10 text-status-overdue rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <CardTitle>Delayed Enquiry Report</CardTitle>
            <CardDescription>
              Identifies enquiries exceeding acceptable age thresholds (7+ days).
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full sm:w-auto" variant="outline" onClick={handleExportDelayed}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-status-in-progress/10 text-status-in-progress rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
            <CardTitle>General Work Report</CardTitle>
            <CardDescription>
              Summarizes all work items, status, assignments, and completion progress.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full sm:w-auto" variant="outline" onClick={handleExportWork}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
