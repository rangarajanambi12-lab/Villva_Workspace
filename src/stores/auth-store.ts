import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEmployeeStore } from './employee-store';
import api from '@/lib/api';

export type Role = 'ADMIN' | 'MD' | 'MANAGER' | 'SALES_ENGINEER' | 'APPLICATION_ENGINEER' | 'PLANT_ENGINEER';

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

interface AuthState {
  user: User | null;
  token: string | null;
  forcePasswordChange: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  setRole: (role: Role) => void;
  updateForcePasswordChangeStatus: (status: boolean) => void;
}

const SUPER_ADMIN = {
  id: 'admin-0',
  email: 'admin@villva.com',
  name: 'Super Admin',
  role: 'ADMIN' as Role,
  password: 'villva123'
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      orgSetupDone: false,
      forcePasswordChange: false,
      isAuthenticated: false,
      login: async (email, pass) => {
        try {
          const res = await api.post('/auth/login', { email, password: pass });
          const { access_token, role, force_password_change } = res.data;
          
          set({
            user: { id: 'api-user', email, name: email, role },
            token: access_token,
            forcePasswordChange: force_password_change,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          console.error("Login failed", error);
          return false;
        }
      },
      logout: () => {
        api.post('/auth/logout').catch(() => {});
        set({ user: null, token: null, forcePasswordChange: false, isAuthenticated: false });
      },
      setRole: (role: Role) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, role } });
        }
      },
      updateForcePasswordChangeStatus: (status) => set({ forcePasswordChange: status })
    }),
    {
      name: 'villva-auth',
      onRehydrateStorage: () => (state) => {
        if (state && state.user) {
          const validRoles = ['ADMIN', 'MD', 'MANAGER', 'SALES_ENGINEER', 'APPLICATION_ENGINEER', 'PLANT_ENGINEER', 'Admin', 'Manager', 'Sales Engineer', 'Application Engineer', 'Plant Engineer'];
          if (!validRoles.includes(state.user.role)) {
            state.logout();
          }
        }
      }
    }
  )
);
