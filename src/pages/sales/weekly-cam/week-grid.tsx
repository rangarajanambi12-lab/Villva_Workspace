import { useCustomerStore } from "@/stores/customer-store";
import { DayCard } from "./day-card";
import { getDay, getMonth, parseISO } from "date-fns";

const DAYS = [
  { id: 1, name: "Monday", color: "from-blue-500/10 to-blue-500/5", border: "border-blue-200 dark:border-blue-900/50" },
  { id: 2, name: "Tuesday", color: "from-purple-500/10 to-purple-500/5", border: "border-purple-200 dark:border-purple-900/50" },
  { id: 3, name: "Wednesday", color: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-200 dark:border-emerald-900/50" },
  { id: 4, name: "Thursday", color: "from-amber-500/10 to-amber-500/5", border: "border-amber-200 dark:border-amber-900/50" },
  { id: 5, name: "Friday", color: "from-rose-500/10 to-rose-500/5", border: "border-rose-200 dark:border-rose-900/50" },
  { id: 6, name: "Saturday", color: "from-cyan-500/10 to-cyan-500/5", border: "border-cyan-200 dark:border-cyan-900/50" },
];

interface WeekGridProps {
  month: number;
  week: number;
}

export function WeekGrid({ month, week }: WeekGridProps) {
  const { customers } = useCustomerStore();

  // Simple filtering logic: matching month and week (using simplified week logic for demo)
  // In a real app, this would use exact date ranges based on the selected week.
  const activeCustomers = customers.filter(c => {
    try {
      const date = parseISO(c.date);
      // We only filter by month for this demo, and split days.
      // Actual week logic would require calculating start/end dates of week 'n'
      return getMonth(date) === month;
    } catch {
      return false;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {DAYS.map((day) => {
        // Filter customers for this specific day of the week
        const dayCustomers = activeCustomers.filter(c => {
          try {
            return getDay(parseISO(c.date)) === day.id;
          } catch {
            return false;
          }
        });

        return (
          <DayCard 
            key={day.id} 
            day={day} 
            customers={dayCustomers} 
          />
        );
      })}
    </div>
  );
}
