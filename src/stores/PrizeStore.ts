import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { Prize } from "../features/prize/PrizeTypes";

interface PrizeStore {
  prizes: Prize[];
  setPrizes: (prizes: Prize[]) => void;
}

const usePrizeStore = create(
  persist<
    PrizeStore,
    SetState<PrizeStore>,
    GetState<PrizeStore>,
    Mutate<StoreApi<PrizeStore>, [["zustand/persist", Partial<PrizeStore>]]>
  >(
    (set) => ({
      prizes: [],

      setPrizes: (prizes: Prize[]) => set(() => ({ prizes })),
    }),
    { name: "@birthday-game/storage/prize-store" }
  )
);

export default usePrizeStore;
