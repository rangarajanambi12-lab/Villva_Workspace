import { Report } from "@/stores/feedback-store";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ReportsTableProps {
  data: Report[];
}

export function ReportsTable({ data }: ReportsTableProps) {
  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const dateStr = row.getValue("date") as string;
        try {
          return format(parseISO(dateStr), "dd/MM/yyyy");
        } catch {
          return dateStr;
        }
      },
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => <div className="font-medium">{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "personName",
      header: "Contact Person",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "outcome",
      header: "Outcome",
    },
    {
      accessorKey: "district",
      header: "District",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" size="sm" onClick={() => alert("View Details not implemented in Phase 1 demo")}>
            <Eye className="mr-2 h-4 w-4" /> View
          </Button>
        );
      },
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="customer" 
      searchPlaceholder="Search reports by customer..." 
    />
  );
}
