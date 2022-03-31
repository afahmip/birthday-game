import useBoardStore from "../../stores/BoardStore";
import useGameStore from "../../stores/GameStore";
import { Board } from "../board/Board";
import { PrizeRevealer } from "../prize/PrizeRevealer";
import { GameState } from "./GameState";

const Game = () => {
  const { gameState, setGameState } = useGameStore();
  const { chosenPrize } = useBoardStore();

  return (
    <>
      {gameState !== GameState.PRIZE_SHOWN ? (
        <Board />
      ) : chosenPrize !== undefined ? (
        <PrizeRevealer prize={chosenPrize} />
      ) : null}
    </>
  );
};

export { Game };
