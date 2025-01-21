import { useShallow } from 'zustand/react/shallow';
import { StoreApi, UseBoundStore } from 'zustand';

const createStoreSelector =
  <K>(store: UseBoundStore<StoreApi<K>>) =>
  <T extends keyof K>(keys: T[]) =>
    store(
      useShallow((state) =>
        keys.reduce(
          (acc, key) => {
            acc[key] = state[key];
            return acc;
          },
          {} as Pick<K, T>,
        ),
      ),
    );

export default createStoreSelector;
