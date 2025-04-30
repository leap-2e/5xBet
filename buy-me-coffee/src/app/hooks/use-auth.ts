"use client";

import { create } from "zustand";

// 1. Төрөл тодорхойлох
interface UserStore {
  userData: {
    email: string;
    username: string;
    userId: string;
  } | null;

  setUserData: (data: {
    email: string;
    username: string;
    userId: string;
  }) => void;

  resetUserData: () => void;
}

// 2. Store үүсгэх
export const useUserStore = create<UserStore>((set) => ({
  userData: null,

  setUserData: (data) => set({ userData: data }),

  resetUserData: () => set({ userData: null }),
}));
