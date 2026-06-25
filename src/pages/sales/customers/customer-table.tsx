import { useCustomerStore, Customer } from "@/stores/customer-store";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export function CustomerTable() {
  const { customers, deleteCustomer } = useCustomerStore();

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
          return format(new Date(dateStr), "dd/MM/yyyy");
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
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => alert("Edit not implemented in Phase 1 demo")}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => deleteCustomer(customer.id)}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={customers} 
      searchKey="customer" 
      searchPlaceholder="Search customers..." 
    />
  );
}
