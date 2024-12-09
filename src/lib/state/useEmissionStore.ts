import { create, StateCreator } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

import { FormData as EmissionRowItem } from "@/lib/schema/emission.schema";
import { generateMockData } from "@/data/mockData";

export type EmissionStoreState = {
  emissions: EmissionRowItem[];
  addEmission: (emission: EmissionRowItem) => void;
  updateEmission: (emission: EmissionRowItem) => void;
  removeEmission: (id: string) => void;
  addMockData: () => void;
};

type EmissionStorePersist = (
  config: StateCreator<EmissionStoreState, [], []>,
  options: PersistOptions<EmissionStoreState>
) => StateCreator<EmissionStoreState, [], []>;

const STORAGE_KEY = "emission-store";

export const useEmissionStore = create<EmissionStoreState>(
  (persist as EmissionStorePersist)(
    (set, get) => ({
      emissions: [],
      addEmission(emission) {
        const currentList = get().emissions;
        set({ emissions: [emission, ...currentList] });
      },

      updateEmission(emission) {
        const currentList = get().emissions;

        const findExisting = currentList.find((em) => em.id === emission.id);

        if (!findExisting) {
          return;
        }

        const updated = {
          ...findExisting,
          ...emission,
        };

        const index = currentList.findIndex((em) => em.id === emission.id);
        currentList[index] = updated;
        const updatedList = [...currentList];

        set({ emissions: updatedList });
      },
      removeEmission(id) {
        set({
          emissions: get().emissions.filter((emission) => emission.id !== id),
        });
      },
      addMockData() {
        const mockData = generateMockData();

        if (get().emissions.length >= 10_000) {
          return;
        }

        set({ emissions: mockData });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
