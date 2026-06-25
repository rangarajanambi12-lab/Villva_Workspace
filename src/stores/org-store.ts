import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Organization {
  id: string;
  companyName: string;
  companyCode: string;
  industryType: string;
  gstNo: string;
  panNo: string;
  cinNo: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  logoUrl?: string;
  bannerUrl?: string;
}

interface OrgState {
  organization: Organization | null;
  isSetupComplete: boolean;
  setOrganization: (org: Organization) => void;
  completeSetup: () => void;
  reset: () => void;
}

export const useOrgStore = create<OrgState>()(
  persist(
    (set) => ({
      organization: null,
      isSetupComplete: false,
      setOrganization: (org) => set({ organization: org }),
      completeSetup: () => set({ isSetupComplete: true }),
      reset: () => set({ organization: null, isSetupComplete: false }),
    }),
    {
      name: 'villva-org',
    }
  )
);
