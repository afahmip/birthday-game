import { ReactNode, useEffect, useState } from "react";
import { wait } from "../../common/GenericFunctions";
import useBoardStore from "../../stores/BoardStore";
import useGameStore from "../../stores/GameStore";
import "./game.css";
import { GameState } from "./GameState";

const WRAPPER_CLASS_ENTRANCE = "game-result-cta-wrapper-entrance";
const WRAPPER_CLASS_ONGOING = "game-result-cta-wrapper-ongoing";
const GIFT_ENTRANCE = "game-result-gift-entrance";
const GIFT_ONGOING = "game-result-gift-ongoing";

type GameResultProps = {
  onRestart: () => void;
  onClaim: () => void;
};

const GameResult = (props: GameResultProps) => {
  const [wrapperClass, setWrapperClass] = useState("");
  const [giftClass, setGiftClass] = useState("");
  const { gameState } = useGameStore();
  const { chosenPrize } = useBoardStore();
  const { onClaim, onRestart } = props;

  useEffect(() => {
    animate();
  }, []);

  const animate = async () => {
    await wait(700);
    setWrapperClass(WRAPPER_CLASS_ENTRANCE);
    setGiftClass(GIFT_ENTRANCE);
    await wait(500);
    setWrapperClass(WRAPPER_CLASS_ONGOING);
    setGiftClass(GIFT_ONGOING);
  };

  const renderWinState = (): ReactNode => {
    return (
      <>
        <div className={`${giftClass} game-result-gift mb-8`}>
          <img src={chosenPrize?.hiddenIcon} alt="" />
        </div>
        <div
          className="game-result-title game-result-win"
          data-content="You Win"
        >
          You Win
        </div>
        <div className={`game-result-cta-wrapper ${wrapperClass}`}>
          <button onClick={onClaim} className="game-result-cta cta-claim">
            Claim your prize!
          </button>
          <button onClick={onRestart} className="game-result-cta cta-restart">
            Restart the game
          </button>
        </div>
      </>
    );
  };

  const renderLoseState = (): ReactNode => {
    return (
      <>
        <div
          className="game-result-title game-result-lose"
          data-content="You Lose"
        >
          You Lose
        </div>
        <div className={`game-result-cta-wrapper ${wrapperClass}`}>
          <button onClick={onRestart} className="game-result-cta cta-restart">
            Restart the game
          </button>
        </div>
      </>
    );
  };

  const renderState = (): ReactNode => {
    switch (gameState) {
      case GameState.GAME_WIN:
        return renderWinState();
      case GameState.GAME_LOSE:
        return renderLoseState();
      default:
        return null;
    }
  };

  return (
    <div className="game-result flex flex-col justify-center items-center absolute h-screen w-screen">
      {renderState()}
    </div>
  );
};

export { GameResult };
