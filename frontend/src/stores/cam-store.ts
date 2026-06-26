import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Customer, useCustomerStore } from './customer-store';

interface CamState {
  // Monthly CAM represents the raw data that was imported/created.
  // We can just rely on the customer store for this, but for legacy compatibility,
  // we could keep a separate archive. In Villva, we just map over customers.
  
  // To keep things simple and avoid duplicate state, CAM store mainly tracks
  // UI state for the CAM module, like selected month/week.
  
  selectedMonth: number; // 0-11
  selectedWeek: number;  // 1-5
  setSelectedMonth: (month: number) => void;
  setSelectedWeek: (week: number) => void;
}

export const useCamStore = create<CamState>()(
  persist(
    (set) => ({
      selectedMonth: new Date().getMonth(),
      selectedWeek: 1, // Default to week 1
      setSelectedMonth: (month) => set({ selectedMonth: month }),
      setSelectedWeek: (week) => set({ selectedWeek: week }),
    }),
    {
      name: 'villva-cam',
    }
  )
);
