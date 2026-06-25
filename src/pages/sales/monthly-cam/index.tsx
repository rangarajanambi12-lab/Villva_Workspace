import { useCustomerStore } from "@/stores/customer-store";
import { CamTable } from "./cam-table";
import { Button } from "@/components/ui/button";
import { Download, Printer, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function MonthlyCamPage() {
  const { customers, clearAll } = useCustomerStore();

  const handleExportCSV = () => alert("Exporting CSV...");
  const handleExportPDF = () => alert("Exporting PDF...");
  const handlePrint = () => window.print();
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all monthly CAM data?")) {
      clearAll();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Monthly CAM</h1>
          <p className="text-muted-foreground">
            View and manage monthly customer activity records.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Printer className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button variant="destructive" onClick={handleClearAll}>
            <Trash className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">Monthly CAM Records</h2>
        <Badge variant="secondary" className="rounded-full px-2.5 py-0.5">
          {customers.length} Total
        </Badge>
      </div>

      <CamTable data={customers} />
    </div>
  );
}
