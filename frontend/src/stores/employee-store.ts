import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'MD' | 'MANAGER' | 'SALES_ENGINEER' | 'APPLICATION_ENGINEER' | 'PLANT_ENGINEER';

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  role: Role;
  status: 'Active' | 'Inactive' | 'Invited';
  passwordHash?: string; // Stored here temporarily for mock purposes
  organizationId?: string;
}

interface EmployeeState {
  employees: User[];
  addEmployee: (employee: Omit<User, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<User>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeeByEmail: (email: string) => User | undefined;
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set, get) => ({
      employees: [],
      addEmployee: (data) => set((state) => ({
        employees: [...state.employees, { ...data, id: `EMP-${Date.now()}` }]
      })),
      updateEmployee: (id, updates) => set((state) => ({
        employees: state.employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
      })),
      deleteEmployee: (id) => set((state) => ({
        employees: state.employees.filter(emp => emp.id !== id)
      })),
      getEmployeeByEmail: (email) => {
        return get().employees.find(emp => emp.email === email);
      }
    }),
    {
      name: 'villva-employees',
    }
  )
);
