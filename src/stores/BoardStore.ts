import create, { GetState, SetState, Mutate, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { HashMap } from "../common/GenericTypes";
import { boardItemDummy } from "../dummy/BoardItemDummy";
import { BoardItemProps } from "../features/board/BoardItem";
import { GameState } from "../features/game/GameState";
import { Prize } from "../features/prize/PrizeTypes";

const TOTAL_TRIES: number = 9;

interface BoardStore {
  items: BoardItemProps[];
  tries: number;
  gameState: GameState;
  chosenPrize: Prize | undefined;
  prizeCounter: HashMap<string, number>;
  setItems: (items: BoardItemProps[]) => void;
  setTries: (tries: number) => void;
  setGameState: (gameState: GameState) => void;
  setChosenPrize: (chosenPrize: Prize | undefined) => void;
  setPrizeCounter: (prizeCounter: HashMap<string, number>) => void;
  shuffleItems: () => void;
  reset: () => void;
}

const useBoardStore = create(
  persist<
    BoardStore,
    SetState<BoardStore>,
    GetState<BoardStore>,
    Mutate<StoreApi<BoardStore>, [["zustand/persist", Partial<BoardStore>]]>
  >(
    (set, get) => ({
      items: boardItemDummy,

      tries: TOTAL_TRIES,

      gameState: GameState.GAME_ONGOING,

      chosenPrize: undefined,

      prizeCounter: {},

      setItems: (items: BoardItemProps[]) => set(() => ({ items })),

      setTries: (tries: number) => set(() => ({ tries })),

      setGameState: (gameState: GameState) => set(() => ({ gameState })),

      setChosenPrize: (chosenPrize: Prize | undefined) =>
        set(() => ({ chosenPrize })),

      setPrizeCounter: (prizeCounter: HashMap<string, number>) =>
        set(() => ({ prizeCounter })),

      shuffleItems: () => {
        const shuffle = (input: any[]): any[] => {
          const array = [...input];
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        set((state) => ({ items: shuffle(state.items) }));
      },

      reset: () => {
        get().setItems(boardItemDummy);
        get().shuffleItems();
        get().setChosenPrize(undefined);
        get().setTries(TOTAL_TRIES);
        get().setPrizeCounter({});
      },
    }),
    { name: "@birthday-game/storage/board-store" }
  )
);

export default useBoardStore;
