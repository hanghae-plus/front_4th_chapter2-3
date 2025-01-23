import { create } from "zustand";
import { Tag } from "@/types/tag.ts";

interface TagStore {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
}));
