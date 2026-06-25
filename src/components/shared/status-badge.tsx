import { Badge } from "@/components/ui/badge";
import { STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (s: string) => {
    switch (s.toLowerCase()) {
      case STATUSES.COMPLETED:
        return "bg-status-completed text-white hover:bg-status-completed/80";
      case STATUSES.PENDING:
        return "bg-status-pending text-white hover:bg-status-pending/80";
      case STATUSES.MISSED:
        return "bg-status-missed text-white hover:bg-status-missed/80";
      case STATUSES.ACTIVE:
        return "bg-primary/20 text-primary hover:bg-primary/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Badge className={cn(getStatusColor(status), "capitalize border-0", className)}>
      {status}
    </Badge>
  );
}
