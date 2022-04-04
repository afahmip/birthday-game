import create, { GetState, Mutate, SetState, StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { GameState } from "../features/game/GameState";

interface GameStore {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
}

const useGameStore = create(
  persist<
    GameStore,
    SetState<GameStore>,
    GetState<GameStore>,
    Mutate<StoreApi<GameStore>, [["zustand/persist", Partial<GameStore>]]>
  >(
    (set) => ({
      gameState: GameState.GAME_START,

      setGameState: (gameState: GameState) => set(() => ({ gameState })),
    }),
    { name: "@birthday-game/storage/game-store" }
  )
);

export default useGameStore;
