import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EnquiryStatus = 'Pending' | 'In Progress' | 'On Hold' | 'Responded';
export type WorkStatus = 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
export type WorkPriority = 'High' | 'Medium' | 'Low';
export type QuotationStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';

export interface PendingEnquiry {
  id: string;
  reference: string;
  customer: string;
  product: string;
  status: EnquiryStatus;
  ageDays: number;
  assignedEngineer: string | null;
  lastUpdate: string;
}

export interface GeneralWork {
  id: string;
  taskId: string;
  description: string;
  assignedEngineer: string;
  status: WorkStatus;
  priority: WorkPriority;
  dueDate: string;
  progress: number;
}

export interface Quotation {
  id: string;
  quoteId: string;
  customer: string;
  enquiryReference: string;
  amount: number;
  status: QuotationStatus;
  createdDate: string;
  expectedCloseDate: string;
}

interface AppEnggState {
  pendingEnquiries: PendingEnquiry[];
  generalWork: GeneralWork[];
  quotations: Quotation[];
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  assignEnquiry: (id: string, engineer: string) => void;
  updateWorkStatus: (id: string, status: WorkStatus, progress?: number) => void;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
}

const INITIAL_ENQUIRIES: PendingEnquiry[] = [
  { id: '1', reference: 'ENQ-2026-101', customer: 'Global Tech Industries', product: 'Industrial Valve Config', status: 'Pending', ageDays: 2, assignedEngineer: 'John Doe', lastUpdate: '2026-06-24' },
  { id: '2', reference: 'ENQ-2026-102', customer: 'Metro Water Systems', product: 'Pump Sizing Analysis', status: 'In Progress', ageDays: 4, assignedEngineer: 'Jane Smith', lastUpdate: '2026-06-22' },
  { id: '3', reference: 'ENQ-2026-103', customer: 'Apex Manufacturing', product: 'Custom Flow Meter', status: 'Pending', ageDays: 8, assignedEngineer: null, lastUpdate: '2026-06-17' },
  { id: '4', reference: 'ENQ-2026-104', customer: 'Green Energy Corp', product: 'Solar Thermal Design', status: 'On Hold', ageDays: 12, assignedEngineer: 'John Doe', lastUpdate: '2026-06-13' },
  { id: '5', reference: 'ENQ-2026-105', customer: 'City Infrastructure', product: 'Piping Network Layout', status: 'Pending', ageDays: 1, assignedEngineer: null, lastUpdate: '2026-06-24' },
];

const INITIAL_WORK: GeneralWork[] = [
  { id: '1', taskId: 'TSK-001', description: 'Update product spec sheets for Q3', assignedEngineer: 'Jane Smith', status: 'In Progress', priority: 'Medium', dueDate: '2026-06-30', progress: 40 },
  { id: '2', taskId: 'TSK-002', description: 'Vendor coordination for custom material', assignedEngineer: 'John Doe', status: 'Not Started', priority: 'High', dueDate: '2026-06-26', progress: 0 },
  { id: '3', taskId: 'TSK-003', description: 'Internal technical training material', assignedEngineer: 'John Doe', status: 'Completed', priority: 'Low', dueDate: '2026-06-20', progress: 100 },
  { id: '4', taskId: 'TSK-004', description: 'Review CAD drawings for Metro Water', assignedEngineer: 'Jane Smith', status: 'On Hold', priority: 'High', dueDate: '2026-07-05', progress: 25 },
];

const INITIAL_QUOTATIONS: Quotation[] = [
  { id: '1', quoteId: 'QT-2026-088', customer: 'Global Tech Industries', enquiryReference: 'ENQ-2026-090', amount: 45000, status: 'Draft', createdDate: '2026-06-20', expectedCloseDate: '2026-07-15' },
  { id: '2', quoteId: 'QT-2026-089', customer: 'BuildWell Contractors', enquiryReference: 'ENQ-2026-092', amount: 120000, status: 'Sent', createdDate: '2026-06-18', expectedCloseDate: '2026-06-30' },
  { id: '3', quoteId: 'QT-2026-090', customer: 'Apex Manufacturing', enquiryReference: 'ENQ-2026-095', amount: 35000, status: 'Accepted', createdDate: '2026-06-10', expectedCloseDate: '2026-06-25' },
  { id: '4', quoteId: 'QT-2026-091', customer: 'City Infrastructure', enquiryReference: 'ENQ-2026-098', amount: 85000, status: 'Sent', createdDate: '2026-06-22', expectedCloseDate: '2026-07-10' },
  { id: '5', quoteId: 'QT-2026-092', customer: 'Sunrise Properties', enquiryReference: 'ENQ-2026-085', amount: 28000, status: 'Rejected', createdDate: '2026-06-05', expectedCloseDate: '2026-06-20' },
  { id: '6', quoteId: 'QT-2026-093', customer: 'Metro Water Systems', enquiryReference: 'ENQ-2026-080', amount: 55000, status: 'Expired', createdDate: '2026-05-15', expectedCloseDate: '2026-06-15' },
];

export const useAppEnggStore = create<AppEnggState>()(
  persist(
    (set) => ({
      pendingEnquiries: INITIAL_ENQUIRIES,
      generalWork: INITIAL_WORK,
      quotations: INITIAL_QUOTATIONS,
      updateEnquiryStatus: (id, status) => set((state) => ({
        pendingEnquiries: state.pendingEnquiries.map((enq) => enq.id === id ? { ...enq, status, lastUpdate: new Date().toISOString().split('T')[0] } : enq)
      })),
      assignEnquiry: (id, engineer) => set((state) => ({
        pendingEnquiries: state.pendingEnquiries.map((enq) => enq.id === id ? { ...enq, assignedEngineer: engineer, lastUpdate: new Date().toISOString().split('T')[0] } : enq)
      })),
      updateWorkStatus: (id, status, progress) => set((state) => ({
        generalWork: state.generalWork.map((work) => {
          if (work.id === id) {
            const newProgress = progress !== undefined ? progress : (status === 'Completed' ? 100 : status === 'Not Started' ? 0 : work.progress);
            return { ...work, status, progress: newProgress };
          }
          return work;
        })
      })),
      updateQuotationStatus: (id, status) => set((state) => ({
        quotations: state.quotations.map((quote) => quote.id === id ? { ...quote, status } : quote)
      }))
    }),
    {
      name: 'villva-app-engg-store',
    }
  )
);
