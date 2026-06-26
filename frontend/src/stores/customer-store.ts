import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_CUSTOMERS } from '../lib/mock-data';

export type Customer = {
  id: string;
  sno: number;
  date: string;
  customer: string;
  purpose: string;
  location: string;
  status: 'active' | 'completed' | 'pending' | 'missed';
};

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'sno' | 'status'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  clearAll: () => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: MOCK_CUSTOMERS as Customer[],
      addCustomer: (data) => set((state) => {
        const nextSno = state.customers.length > 0 ? Math.max(...state.customers.map(c => c.sno)) + 1 : 1;
        const newCustomer: Customer = {
          ...data,
          id: `CUST-${Date.now()}`,
          sno: nextSno,
          status: 'pending'
        };
        return { customers: [...state.customers, newCustomer] };
      }),
      updateCustomer: (id, updates) => set((state) => ({
        customers: state.customers.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter(c => c.id !== id)
      })),
      clearAll: () => set({ customers: [] })
    }),
    {
      name: 'villva-customers',
    }
  )
);
