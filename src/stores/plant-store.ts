import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type JobStatus = 'Done' | 'Completed' | 'In Progress' | 'Planned' | 'Pending' | 'Missed' | 'Overdue' | 'Need Support' | 'Blocked' | 'Stuck';

export interface PlantJob {
  id: string;
  jobNo: string;
  customer: string;
  assembly: JobStatus | string;
  testing: JobStatus | string;
  dispatch: JobStatus | string;
  targetDate: string;
  // Tracking table fields
  weekRange: string;
  day: string;
  employee: string;
  task: string;
  description: string;
  status: JobStatus;
}

export interface WamEntry {
  id: string;
  weekStart: string;
  weekEnd: string;
  day: string;
  employee: string;
  task: string;
  description: string;
}

interface PlantState {
  jobs: PlantJob[];
  wamEntries: WamEntry[];
  addJob: (job: Omit<PlantJob, 'id'>) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  addWamEntry: (entry: Omit<WamEntry, 'id'>) => void;
  deleteWamEntry: (id: string) => void;
  triggerWamToTracking: () => void;
}

const INITIAL_JOBS: PlantJob[] = [
  { id: '1', jobNo: 'FT-2291', customer: 'Salem Steel Plant', assembly: 'In Progress', testing: 'Pending', dispatch: 'Pending', targetDate: '28 Jun 2026', weekRange: '22 Jun - 28 Jun', day: 'Monday', employee: 'Selvaraj', task: 'FT-2291 Assembly', description: 'Salem Steel Plant', status: 'In Progress' },
  { id: '2', jobNo: 'FT-2284', customer: 'Coromandel Engineering Works', assembly: 'Completed', testing: 'Completed', dispatch: 'In Progress', targetDate: '19 Jun 2026', weekRange: '15 Jun - 21 Jun', day: 'Wednesday', employee: 'Sivakumar', task: 'FT-2284 Dispatch', description: 'Coromandel Eng', status: 'Pending' },
  { id: '3', jobNo: 'FT-2270', customer: 'Hindustan Zinc Works', assembly: 'Completed', testing: 'Completed', dispatch: 'Completed', targetDate: '05 Jun 2026', weekRange: '01 Jun - 07 Jun', day: 'Friday', employee: 'Gopinath', task: 'FT-2270 Dispatch', description: 'Hindustan Zinc', status: 'Done' },
  { id: '4', jobNo: 'FT-2265', customer: 'Tirupati Power Corp', assembly: 'Pending', testing: 'Pending', dispatch: 'Pending', targetDate: '02 Jul 2026', weekRange: '29 Jun - 05 Jul', day: 'Tuesday', employee: 'Rajesh', task: 'FT-2265 Assembly', description: 'Tirupati Power', status: 'Pending' },
  { id: '5', jobNo: 'FT-2258', customer: 'Madras Fertilizers Ltd', assembly: 'In Progress', testing: 'Pending', dispatch: 'Pending', targetDate: '15 Jun 2026', weekRange: '08 Jun - 14 Jun', day: 'Thursday', employee: 'Parthipan', task: 'FT-2258 Assembly', description: 'Madras Fert', status: 'Stuck' },
  { id: '6', jobNo: 'FT-2247', customer: 'Neyveli Lignite Corp', assembly: 'Completed', testing: 'In Progress', dispatch: 'Pending', targetDate: '22 Jun 2026', weekRange: '15 Jun - 21 Jun', day: 'Monday', employee: 'Sivakumar', task: 'FT-2247 Testing', description: 'Neyveli Lignite', status: 'Done' },
];

export const usePlantStore = create<PlantState>()(
  persist(
    (set) => ({
      jobs: INITIAL_JOBS,
      wamEntries: [],
      addJob: (job) => set((state) => ({
        jobs: [{ ...job, id: Math.random().toString(36).substr(2, 9) }, ...state.jobs]
      })),
      updateJobStatus: (id, status) => set((state) => ({
        jobs: state.jobs.map((job) => job.id === id ? { ...job, status } : job)
      })),
      addWamEntry: (entry) => set((state) => ({
        wamEntries: [{ ...entry, id: Math.random().toString(36).substr(2, 9) }, ...state.wamEntries]
      })),
      deleteWamEntry: (id) => set((state) => ({
        wamEntries: state.wamEntries.filter((entry) => entry.id !== id)
      })),
      triggerWamToTracking: () => set((state) => {
        const newJobs = state.wamEntries.map(entry => ({
          id: Math.random().toString(36).substr(2, 9),
          jobNo: '-',
          customer: entry.description || '-',
          assembly: 'Pending',
          testing: 'Pending',
          dispatch: 'Pending',
          targetDate: '-',
          weekRange: `${entry.weekStart} - ${entry.weekEnd}`,
          day: entry.day,
          employee: entry.employee,
          task: entry.task,
          description: entry.description,
          status: 'Planned' as JobStatus
        }));
        return {
          jobs: [...newJobs, ...state.jobs]
        };
      })
    }),
    {
      name: 'villva-plant-store',
    }
  )
);
