'use client';
import { create } from "zustand";
import { UserProfileType } from "../types/user-profile";
import { PaymentInfoType } from "../types/user-payment";


type UserDataState = {
  profile: UserProfileType | null;
  payment: PaymentInfoType | null;

  setProfile: (profile: UserProfileType) => void;
  setPayment: (payment: PaymentInfoType) => void;

}

export const useUserDataStore = create<UserDataState>((set) => (
  {
    profile: null,
    payment: null,

    setProfile: (profile) => set({ profile }),
    setPayment: (payment) => set({ payment }),
  })
)


//import useUserDataStore
//use profile payment as const {profile, payment} = useUserDataStore()
//To take one value like username or image => const username = useUserDataStore((state) => state.profile?.username);
