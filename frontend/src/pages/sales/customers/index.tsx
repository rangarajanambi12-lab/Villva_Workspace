import { useState } from "react";
import { useCustomerStore } from "@/stores/customer-store";
import { CustomerTable } from "./customer-table";
import { CustomerForm } from "./customer-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CustomerMasterPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Customer Master</h1>
          <p className="text-muted-foreground">
            Manage your customer database and visit schedules.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <CustomerTable />
      
      <CustomerForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
      />
    </div>
  );
}
