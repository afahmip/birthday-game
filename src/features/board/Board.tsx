import { ReactNode, useEffect, useState } from "react";
import { HashMap } from "../../common/GenericTypes";
import { prizeListDummy } from "../../dummy/BoardItemDummy";
import useBoardStore from "../../stores/BoardStore";
import { GameState } from "../game/GameState";
import { BoardItem } from "./BoardItem";
import { BoardItemPrize, BoardItemStatus } from "./BoardItemTypes";

type BoardProps = {};

const Board = (props: BoardProps) => {
  const {
    items,
    tries,
    gameState,
    chosenPrize,
    prizeCounter,
    setItems,
    setTries,
    setGameState,
    setChosenPrize,
    setPrizeCounter,
    reset,
  } = useBoardStore();
  const [totalPrize, setTotalPrize] = useState<HashMap>({});

  useEffect(() => {
    const counter: HashMap = {};
    items.map((item) => {
      if (item.prize !== undefined) {
        const { id } = item.prize;
        if (counter[id] !== undefined) {
          counter[id] = counter[id] + 1;
        } else {
          counter[item.prize.id] = 1;
        }
      }
    });
    setTotalPrize(counter);
  }, []);

  useEffect(() => {
    let maxAmount: number = 0;
    let prize: BoardItemPrize | undefined;
    Object.keys(prizeCounter).map((key) => {
      if (prizeCounter[key] > maxAmount) {
        prize = prizeListDummy[key];
        maxAmount = prizeCounter[key];
      }
    });
    if (prize !== undefined && maxAmount === totalPrize[prize.id]) {
      setChosenPrize(prize);
    }
  }, [prizeCounter]);

  useEffect(() => {
    if (chosenPrize !== undefined) {
      setGameState(GameState.GAME_WIN);
    }
  }, [chosenPrize]);

  useEffect(() => {
    if (tries === 0 && chosenPrize === undefined) {
      setGameState(GameState.GAME_LOSE);
    }
  }, [tries]);

  const openItem = (idx: number) => {
    if (
      tries - 1 >= 0 &&
      items[idx].status !== BoardItemStatus.OPEN &&
      gameState === GameState.GAME_ONGOING
    ) {
      setTries(tries - 1);
      setItems([
        ...items.slice(0, idx),
        Object.assign({}, items[idx], { status: BoardItemStatus.OPEN }),
        ...items.slice(idx + 1),
      ]);
      updatePrizeCounter(idx);
    }
  };

  const updatePrizeCounter = (idx: number) => {
    let item = items[idx];
    if (item.prize !== undefined) {
      const { id } = item.prize;
      const newCounter: HashMap = { ...prizeCounter };
      if (newCounter[id] !== undefined) {
        newCounter[id] = newCounter[id] + 1;
      } else {
        newCounter[id] = 1;
      }
      setPrizeCounter(newCounter);
    }
  };

  const renderFinishState = (): ReactNode =>
    gameState === GameState.GAME_LOSE ? (
      <button onClick={reset}>Restart game?</button>
    ) : null;

  return (
    <div className="board-wrapper flex flex-col justify-center items-center h-screen">
      <div className="board flex flex-row flex-wrap p-1.5 rounded-md m-1">
        {items.map((item, idx) => (
          <BoardItem
            key={item.id}
            id={item.id}
            prize={item.prize}
            status={item.status}
            onStatusChange={() => openItem(idx)}
          />
        ))}
      </div>
      <div className="board-counter flex flex-row self-center justify-center items-center rounded-md m-8 p-2">
        <div className="board-counter-count rounded-md text-6xl px-2">
          {tries}
        </div>
        <p className="text-3xl font-bold mx-2">
          tr{tries > 1 ? "ies" : "y"} left
        </p>
      </div>
      {renderFinishState()}
      {JSON.stringify(totalPrize)}
      {JSON.stringify(prizeCounter)}
      {JSON.stringify(chosenPrize)}
    </div>
  );
};

export { Board };
export type { BoardProps };
