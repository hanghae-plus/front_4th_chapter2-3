import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UIStore } from './types';

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      loading: false,

      setLoading: (loading) => set({ loading }, false, 'ui/setLoading'),
    }),
    {
      name: 'UIStore',
    },
  ),
);
