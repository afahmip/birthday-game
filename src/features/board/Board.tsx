import { useEffect, useState } from "react";
import { HashMap } from "../../common/GenericTypes";
import { prizeDummyA, prizeDummyB } from "../../dummy/BoardItemDummy";
import useBoardStore from "../../stores/BoardStore";
import useGameStore from "../../stores/GameStore";
import usePrizeStore from "../../stores/PrizeStore";
import { GameResult } from "../game/GameResult";
import { GameState } from "../game/GameState";
import { Prize } from "../prize/PrizeTypes";
import { BoardItem } from "./BoardItem";
import { BoardItemStatus } from "./BoardItemTypes";

type BoardProps = {};

const MAX_BOARD_SIZE: number = 16;
const TOTAL_TRIES: number = 10;

const Board = (props: BoardProps) => {
  const {
    items,
    tries,
    chosenPrize,
    prizeCounter,
    setItems,
    setTries,
    setChosenPrize,
    setPrizeCounter,
    createBoardItems,
    reset,
  } = useBoardStore();
  const { gameState, setGameState } = useGameStore();
  const { setPrizes } = usePrizeStore();
  const [totalPrize, setTotalPrize] = useState<HashMap<string, number>>({});
  const [prizeMap, setPrizeMap] = useState<HashMap<string, Prize>>({});

  useEffect(() => {
    if (items.length > 0) {
      initTotalPrize();
    }
  }, [items]);

  useEffect(() => {
    if (gameState === GameState.GAME_START) {
      initBoard();
    }
  }, [gameState]);

  useEffect(() => {
    let maxAmount: number = 0;
    let prize: Prize | undefined;
    Object.keys(prizeCounter).map((key) => {
      if (prizeCounter[key] > maxAmount) {
        prize = prizeMap[key];
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

  const initBoard = () => {
    let prizes = [prizeDummyA, prizeDummyB];
    initPrizeMap(prizes);
    createBoardItems(MAX_BOARD_SIZE, prizes);
    setPrizes(prizes);
    setTries(TOTAL_TRIES);
    setGameState(GameState.GAME_ONGOING);
  };

  const initPrizeMap = (prizes: Prize[]) => {
    const hashMap: HashMap<string, Prize> = {};
    prizes.map((prize) => {
      hashMap[prize.id] = prize;
    });
    setPrizeMap(hashMap);
  };

  const initTotalPrize = () => {
    const counter: HashMap<string, number> = {};
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
  };

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
      const newCounter: HashMap<string, number> = { ...prizeCounter };
      if (newCounter[id] !== undefined) {
        newCounter[id] = newCounter[id] + 1;
      } else {
        newCounter[id] = 1;
      }
      setPrizeCounter(newCounter);
    }
  };

  const resetGame = () => {
    reset();
    setGameState(GameState.GAME_START);
  };

  const claimPrize = () => {
    setGameState(GameState.PRIZE_SHOWN);
  };

  return (
    <>
      {gameState === GameState.GAME_LOSE || gameState === GameState.GAME_WIN ? (
        <GameResult onRestart={resetGame} onClaim={claimPrize} />
      ) : null}
      <div className="board-wrapper flex flex-col justify-center items-center h-screen">
        <p className="board-desc mb-8 mx-5 font-semibold">
          Find 3 (three) of the same gifts to win the prize!
        </p>
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
            <p>{tries < 10 ? `0${tries}` : `${tries}`}</p>
          </div>
          <p className="board-counter-desc text-3xl font-bold mx-2">
            tr{tries > 1 ? "ies" : "y"} left
          </p>
        </div>
      </div>
    </>
  );
};

export { Board };
export type { BoardProps };
