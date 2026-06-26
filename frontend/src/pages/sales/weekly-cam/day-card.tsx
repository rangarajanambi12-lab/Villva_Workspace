import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/stores/customer-store";
import { CustomerItem } from "./customer-item";
import { cn } from "@/lib/utils";

interface DayCardProps {
  day: {
    id: number;
    name: string;
    color: string;
    border: string;
  };
  customers: Customer[];
}

export function DayCard({ day, customers }: DayCardProps) {
  return (
    <Card className={cn("overflow-hidden border-t-4", day.border)}>
      <CardHeader className={cn("pb-3 pt-4 bg-gradient-to-br", day.color)}>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold">{day.name}</span>
          <span className="text-xs font-normal bg-background/50 px-2 py-1 rounded-full text-muted-foreground border">
            {customers.length} Tasks
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 bg-muted/10 min-h-[150px]">
        {customers.length === 0 ? (
          <div className="flex items-center justify-center h-[120px] text-sm text-muted-foreground/60 italic">
            No activities scheduled
          </div>
        ) : (
          <div className="divide-y">
            {customers.map((customer) => (
              <CustomerItem key={customer.id} customer={customer} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
