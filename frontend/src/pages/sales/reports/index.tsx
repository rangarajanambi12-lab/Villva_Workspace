import { useFeedbackStore } from "@/stores/feedback-store";
import { ReportsTable } from "./reports-table";
import { Button } from "@/components/ui/button";
import { Download, Printer, Trash } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export function ReportsPage() {
  const { reports, clearAll } = useFeedbackStore();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearAll = () => {
    if (confirmClear) {
      clearAll();
      setIsClearModalOpen(false);
      setConfirmClear(false);
    }
  };

  const handleExportCSV = () => {
    alert("Exporting CSV... (Demo)");
  };

  const handleExportPDF = () => {
    alert("Exporting PDF... (Demo)");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Visit Reports</h1>
          <p className="text-muted-foreground">
            View and export collected customer feedback.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" /> CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Printer className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button variant="destructive" onClick={() => setIsClearModalOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <ReportsTable data={reports} />

      <Dialog open={isClearModalOpen} onOpenChange={setIsClearModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash className="h-5 w-5" /> Clear All Reports
            </DialogTitle>
            <DialogDescription className="pt-4">
              This action will permanently delete ALL feedback reports. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <Checkbox 
              id="confirm" 
              checked={confirmClear} 
              onCheckedChange={(c) => setConfirmClear(c as boolean)} 
            />
            <label
              htmlFor="confirm"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Yes, I want to delete all reports permanently
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClearModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" disabled={!confirmClear} onClick={handleClearAll}>
              Delete All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
