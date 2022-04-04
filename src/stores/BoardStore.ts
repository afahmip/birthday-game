import create, { GetState, SetState, Mutate, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { HashMap } from "../common/GenericTypes";
import { BoardItemProps } from "../features/board/BoardItem";
import { GameState } from "../features/game/GameState";
import { Prize } from "../features/prize/PrizeTypes";
import { BoardItemStatus } from "../features/board/BoardItemTypes";

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
  createBoardItems: (totalAmount: number, prizes: Prize[]) => void;
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
      items: [],

      tries: -1,

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

      createBoardItems: (totalAmount: number, prizes: Prize[]) => {
        const items: BoardItemProps[] = [];

        prizes.map((prize) => {
          for (let i = 0; i < 3; i++) {
            items.push({
              id: uuidv4(),
              prize: prize,
              status: BoardItemStatus.CLOSE,
            });
          }
        });

        for (let i = 0; i < totalAmount - 3 * prizes.length; i++) {
          items.push({
            id: uuidv4(),
            status: BoardItemStatus.CLOSE,
          });
        }

        get().setItems(items);
        get().shuffleItems();
      },

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
        get().setItems([]);
        get().setChosenPrize(undefined);
        get().setTries(TOTAL_TRIES);
        get().setPrizeCounter({});
      },
    }),
    { name: "@birthday-game/storage/board-store" }
  )
);

export default useBoardStore;
