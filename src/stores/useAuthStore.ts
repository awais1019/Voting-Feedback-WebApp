import { create } from "zustand";
import type { User } from "../lib/types";




type authState = {
  user:User | null;
  setAuthData: (user: User) => void;
  clearAuthData: () => void;
};

export const useAuthStore = create<authState>((set) => ({
  user:null,
  setAuthData: (user: User) => {
    set({ user:user });
  },
  clearAuthData: () => set({ user:null }),
}));
