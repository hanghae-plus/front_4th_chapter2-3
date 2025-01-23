import { create } from "zustand/react";
import { User } from "@/types/user.ts";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users: User[]) => set({ users }),
}));
