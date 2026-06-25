import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_REPORTS } from '../lib/mock-data';

export type PersonFeedback = {
  personName: string;
  designation: string;
  department: string;
  mobile: string;
  email: string;
  outcome: string[];
  keyFactor: string;
  nextAction: string;
  requirement: string;
  image: string | null; // Data URL
};

export type Report = {
  id: string;
  taskId: string;
  date: string;
  customer: string;
  district: string;
  industry: string;
  address: string;
  
  // Person 1 (Primary) is flattened for main table view in legacy compatibility, 
  // but we store it structured in a new app
  person1: PersonFeedback;
  person2?: PersonFeedback;
  person3?: PersonFeedback;
  
  // Legacy flat fields for table view
  personName: string;
  mobile: string;
  email: string;
  outcome: string;
};

interface FeedbackState {
  reports: Report[];
  addReport: (report: Omit<Report, 'id'>) => void;
  deleteReport: (id: string) => void;
  clearAll: () => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      reports: MOCK_REPORTS as unknown as Report[], // Type coercion for mock data
      addReport: (data) => set((state) => ({
        reports: [...state.reports, { ...data, id: `REP-${Date.now()}` }]
      })),
      deleteReport: (id) => set((state) => ({
        reports: state.reports.filter(r => r.id !== id)
      })),
      clearAll: () => set({ reports: [] })
    }),
    {
      name: 'villva-feedback',
    }
  )
);
