import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkline } from "./sparkline";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  sparklineData?: { value: number }[];
  sparklineColor?: string;
  onClick?: () => void;
  className?: string;
  valueClassName?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  sparklineData,
  sparklineColor = "var(--color-primary)",
  onClick,
  className,
  valueClassName
}: StatCardProps) {
  return (
    <Card 
      className={cn(onClick && "cursor-pointer transition-colors hover:bg-muted/50", className)} 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {sparklineData && (
          <div className="mt-4">
            <Sparkline data={sparklineData} color={sparklineColor} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
