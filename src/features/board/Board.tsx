import { useEffect, useState } from "react";
import { Nullable } from "../../common/GenericTypes";
import { boardItemDummy, prizeListDummy } from "../../dummy/BoardItemDummy";
import { BoardItem, BoardItemProps } from "./BoardItem";
import { BoardItemPrize, BoardItemStatus } from "./BoardItemTypes";

type BoardProps = {};

type PrizeCounterMap = { [id: string]: number };

const TOTAL_TRIES: number = 8;

const Board = (props: BoardProps) => {
  const [items, setItems] = useState<BoardItemProps[]>([]);
  const [tries, setTries] = useState<number>(TOTAL_TRIES);
  const [totalPrize, setTotalPrize] = useState<PrizeCounterMap>({});
  const [prizeCounter, setPrizeCounter] = useState<PrizeCounterMap>({});
  const [chosenPrize, setChosenPrize] = useState<BoardItemPrize>();

  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(() => {
    const counter: PrizeCounterMap = {};
    boardItemDummy.map((item) => {
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
    let prize: Nullable<BoardItemPrize> = null;
    Object.keys(prizeCounter).map((key) => {
      if (prizeCounter[key] > maxAmount) {
        prize = prizeListDummy[key];
        maxAmount = prizeCounter[key];
      }
    });
    if (prize !== null) {
      setChosenPrize(prize);
    }
  }, [prizeCounter]);

  const openItem = (idx: number) => {
    if (tries - 1 >= 0 && items[idx].status !== BoardItemStatus.OPEN) {
      setTries(tries - 1);
      setItems([
        ...items.slice(0, idx),
        Object.assign({}, items[idx], { status: BoardItemStatus.OPEN }),
        ...items.slice(idx + 1),
      ]);
      updateChosenPrize(idx);
    }
  };

  const updateChosenPrize = (idx: number) => {
    let item = items[idx];
    if (item.prize !== undefined) {
      const { id } = item.prize;
      const newCounter: PrizeCounterMap = { ...prizeCounter };
      if (newCounter[id] !== undefined) {
        newCounter[id] = newCounter[id] + 1;
      } else {
        newCounter[id] = 1;
      }
      setPrizeCounter(newCounter);
    }
  };

  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const resetBoard = () => {
    const initialItems = [...boardItemDummy];
    shuffle(initialItems);
    setItems(initialItems);
    setChosenPrize(undefined);
    setTries(TOTAL_TRIES);
    setPrizeCounter({});
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
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
      <p>{tries} tries left</p>
      <button onClick={resetBoard}>Restart game?</button>
      {JSON.stringify(totalPrize)}
      {JSON.stringify(prizeCounter)}
      {JSON.stringify(chosenPrize)}
    </div>
  );
};

export { Board };
export type { BoardProps };
