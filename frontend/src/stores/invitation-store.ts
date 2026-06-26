import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addHours, isAfter } from 'date-fns';

export interface Invitation {
  id: string;
  email: string;
  token: string;
  role: string;
  expiresAt: string; // ISO Date String
  acceptedAt?: string;
  organizationId?: string;
}

interface InvitationState {
  invitations: Invitation[];
  createInvitation: (email: string, role: string) => Invitation;
  getInvitationByToken: (token: string) => Invitation | undefined;
  acceptInvitation: (token: string) => boolean;
  resendInvitation: (id: string) => Invitation | undefined;
}

export const useInvitationStore = create<InvitationState>()(
  persist(
    (set, get) => ({
      invitations: [],
      createInvitation: (email, role) => {
        // Generate a random token for mock purposes
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiresAt = addHours(new Date(), 72).toISOString();
        
        const newInvite: Invitation = {
          id: `INV-${Date.now()}`,
          email,
          token,
          role,
          expiresAt,
        };

        set((state) => ({
          invitations: [...state.invitations, newInvite]
        }));
        
        return newInvite;
      },
      getInvitationByToken: (token) => {
        const invite = get().invitations.find(inv => inv.token === token);
        if (!invite) return undefined;
        
        // Check if expired
        if (isAfter(new Date(), new Date(invite.expiresAt))) {
          return undefined; // Expired
        }
        
        return invite;
      },
      acceptInvitation: (token) => {
        let success = false;
        set((state) => ({
          invitations: state.invitations.map(inv => {
            if (inv.token === token && !inv.acceptedAt) {
              success = true;
              return { ...inv, acceptedAt: new Date().toISOString() };
            }
            return inv;
          })
        }));
        return success;
      },
      resendInvitation: (id) => {
        const state = get();
        const existing = state.invitations.find(inv => inv.id === id);
        if (!existing) return undefined;
        
        const newToken = Math.random().toString(36).substring(2, 15);
        const newExpiresAt = addHours(new Date(), 72).toISOString();
        
        set((state) => ({
          invitations: state.invitations.map(inv => 
            inv.id === id ? { ...inv, token: newToken, expiresAt: newExpiresAt } : inv
          )
        }));
        
        return { ...existing, token: newToken, expiresAt: newExpiresAt };
      }
    }),
    {
      name: 'villva-invitations',
    }
  )
);
