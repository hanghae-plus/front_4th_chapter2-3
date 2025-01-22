import { create } from "zustand";
import { Tag } from "@/types/tag.ts";

interface TagStore {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  selectedTag: Tag | null;
  setSelectedTag: (tag: string) => void;
}

export const useTagStore = create<TagStore>((set, get) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  selectedTag: null,
  setSelectedTag: (slug) => {
    const { tags } = get();
    const foundTag = tags.find((tag) => tag.slug === slug);
    set({ selectedTag: foundTag || null });
  },
}));
