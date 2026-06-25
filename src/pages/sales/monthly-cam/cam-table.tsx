import { Customer } from "@/stores/customer-store";
import { DataTable } from "@/components/shared/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";

interface CamTableProps {
  data: Customer[];
}

export function CamTable({ data }: CamTableProps) {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "sno",
      header: "S.No",
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("sno")}</div>,
    },
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
      header: "Customer Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("customer")}</div>,
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="customer" 
      searchPlaceholder="Search CAM records by customer..." 
    />
  );
}
