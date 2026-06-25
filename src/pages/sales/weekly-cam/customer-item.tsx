import { Customer, useCustomerStore } from "@/stores/customer-store";
import { Button } from "@/components/ui/button";
import { Plus, Eye, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CustomerItemProps {
  customer: Customer;
}

export function CustomerItem({ customer }: CustomerItemProps) {
  const { updateCustomer } = useCustomerStore();
  const navigate = useNavigate();

  const handleStatusChange = (status: Customer['status']) => {
    updateCustomer(customer.id, { status });
  };

  const isCompleted = customer.status === 'completed';
  const isMissed = customer.status === 'missed';

  return (
    <div className={cn(
      "p-4 transition-colors group",
      isCompleted && "bg-status-completed/5",
      isMissed && "bg-status-missed/5 opacity-75"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className={cn(
            "font-semibold text-sm",
            isCompleted && "text-status-completed",
            isMissed && "line-through text-muted-foreground"
          )}>
            {customer.customer}
          </h4>
          <p className="text-xs text-muted-foreground">{customer.location}</p>
        </div>
        
        <div className="flex gap-1">
          {isCompleted ? (
            <div className="h-6 w-6 rounded-full bg-status-completed/20 flex items-center justify-center">
              <Check className="h-3 w-3 text-status-completed" />
            </div>
          ) : isMissed ? (
            <div className="h-6 w-6 rounded-full bg-status-missed/20 flex items-center justify-center">
              <X className="h-3 w-3 text-status-missed" />
            </div>
          ) : (
            // Person count badge (mocking 1 person for now)
            <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
              1
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{customer.purpose}</p>

      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-[10px] px-2"
          onClick={() => navigate(`/sales/visit-report?customerId=${customer.id}`)}
        >
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-[10px] px-2"
        >
          <Eye className="h-3 w-3 mr-1" /> View
        </Button>
        <div className="flex-1" />
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-status-missed hover:text-status-missed hover:bg-status-missed/10"
          onClick={() => handleStatusChange('missed')}
          title="Mark Missed"
        >
          <X className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 text-status-completed hover:text-status-completed hover:bg-status-completed/10"
          onClick={() => handleStatusChange('completed')}
          title="Mark Done"
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
