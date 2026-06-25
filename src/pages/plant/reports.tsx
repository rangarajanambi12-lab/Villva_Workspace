import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, ClipboardList } from "lucide-react";
import { usePlantStore } from "@/stores/plant-store";

export function PlantReports() {
  const { jobs, wamEntries } = usePlantStore();

  const handleExportPerformance = () => {
    if (jobs.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Job No", "Customer", "Assembly", "Testing", "Dispatch", "Target Date", "Status", "Week", "Day", "Employee", "Task"];
    const rows = jobs.map(j => [
      j.jobNo, j.customer, j.assembly, j.testing, j.dispatch, j.targetDate, j.status, j.weekRange, j.day, j.employee, j.task
    ].map(v => `"${v}"`).join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    downloadCSV(csvContent, "plant-team-performance.csv");
  };

  const handleExportWam = () => {
    if (wamEntries.length === 0) {
      alert("No WAM data available to export.");
      return;
    }

    const headers = ["Week", "Day", "Employee", "Task", "Description"];
    const rows = wamEntries.map(w => [
      `${w.weekStart} - ${w.weekEnd}`, w.day, w.employee, w.task, w.description || ""
    ].map(v => `"${v}"`).join(","));

    const csvContent = [headers.join(","), ...rows].join("\n");
    downloadCSV(csvContent, "plant-team-wam-report.csv");
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Reports</h1>
        <p className="text-muted-foreground">
          Generate and export operational reports for the Plant Team. Exports download as CSV files ready for Excel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <CardTitle>Plant Team Performance Report</CardTitle>
            <CardDescription>
              Export the complete tracking table data including active jobs, statuses, and completion rates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contains {jobs.length} tracking records.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto" onClick={handleExportPerformance}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="mb-2 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6" />
            </div>
            <CardTitle>WAM Compliance Report</CardTitle>
            <CardDescription>
              Export weekly task submissions to audit planned work distribution across the team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contains {wamEntries.length} planned task records.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto" onClick={handleExportWam}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
