import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface WeekNavigatorProps {
  month: number;
  week: number;
  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
}

export function WeekNavigator({ month, week, onMonthChange, onWeekChange }: WeekNavigatorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-3 rounded-xl border shadow-sm">
      <div className="flex items-center gap-3">
        <Select value={month.toString()} onValueChange={(v) => onMonthChange(parseInt(v))}>
          <SelectTrigger className="w-[140px] font-medium border-0 bg-muted/50 focus:ring-0">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m, i) => (
              <SelectItem key={i} value={i.toString()}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Badge variant="outline" className="px-3 py-1 font-semibold text-primary bg-primary/5 border-primary/20">
          Week {week === 5 ? "4+" : week}
        </Badge>
      </div>

      <div className="flex bg-muted/50 p-1 rounded-lg">
        {[1, 2, 3, 4, 5].map((w) => (
          <Button
            key={w}
            variant="ghost"
            size="sm"
            onClick={() => onWeekChange(w)}
            className={cn(
              "h-8 w-10 px-0 rounded-md font-medium transition-all",
              week === w 
                ? "bg-background shadow-sm text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {w === 5 ? "4+" : w}
          </Button>
        ))}
      </div>
    </div>
  );
}
