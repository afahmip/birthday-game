import { useEffect, useState } from "react";
import { boardItemDummy } from "../../dummy/BoardItemDummy";
import { BoardItem, BoardItemProps } from "./BoardItem";
import { BoardItemStatus } from "./BoardItemTypes";

type BoardProps = {};

const Board = (props: BoardProps) => {
  const [items, setItems] = useState<BoardItemProps[]>([]);

  useEffect(() => {
    let newItems: BoardItemProps[] = boardItemDummy;
    setItems(newItems);
  }, []);

  const openItem = (idx: number) => {
    setItems([
      ...items.slice(0, idx),
      Object.assign({}, items[idx], { status: BoardItemStatus.OPEN }),
      ...items.slice(idx + 1),
    ]);
  };

  return (
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
  );
};

export { Board };
export type { BoardProps };
