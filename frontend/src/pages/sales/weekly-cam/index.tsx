import { useState } from "react";
import { useCustomerStore } from "@/stores/customer-store";
import { WeekNavigator } from "./week-navigator";
import { WeekGrid } from "./week-grid";
import { useCamStore } from "@/stores/cam-store";

export function WeeklyCamPage() {
  const { selectedMonth, selectedWeek, setSelectedMonth, setSelectedWeek } = useCamStore();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Weekly CAM</h1>
          <p className="text-muted-foreground">
            Customer Activity Management - Monday to Saturday
          </p>
        </div>
        
        <WeekNavigator 
          month={selectedMonth} 
          week={selectedWeek}
          onMonthChange={setSelectedMonth}
          onWeekChange={setSelectedWeek}
        />
      </div>

      <WeekGrid month={selectedMonth} week={selectedWeek} />
    </div>
  );
}
