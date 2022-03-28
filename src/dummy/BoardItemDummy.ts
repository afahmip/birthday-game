import { BoardItemProps } from "../features/board/BoardItem";
import {
  BoardItemStatus,
  BoardItemPrize,
} from "../features/board/BoardItemTypes";

const prizeDummyA: BoardItemPrize = {
  id: "prize-a",
  name: "Prize A",
  image: "https://cdn-icons-png.flaticon.com/512/1042/1042339.png",
  hiddenIcon: "https://cdn-icons-png.flaticon.com/512/1140/1140033.png",
};

const prizeDummyB: BoardItemPrize = {
  id: "prize-b",
  name: "Prize B",
  image:
    "https://cdn-icons.flaticon.com/png/512/2997/premium/2997309.png?token=exp=1648481337~hmac=458380c9d98425be84ace4a4628f33e2",
  hiddenIcon: "https://cdn-icons-png.flaticon.com/512/2743/2743237.png",
};

type PrizeList = { [id: string]: BoardItemPrize };

const prizeListDummy: PrizeList = {
  "prize-a": prizeDummyA,
  "prize-b": prizeDummyB,
};

const boardItemDummy: BoardItemProps[] = [
  { id: "a", status: BoardItemStatus.CLOSE, prize: prizeDummyA },
  { id: "b", status: BoardItemStatus.CLOSE },
  { id: "c", status: BoardItemStatus.CLOSE },
  { id: "d", status: BoardItemStatus.CLOSE, prize: prizeDummyB },
  { id: "e", status: BoardItemStatus.CLOSE },
  { id: "f", status: BoardItemStatus.CLOSE },
  { id: "h", status: BoardItemStatus.CLOSE },
  { id: "i", status: BoardItemStatus.CLOSE, prize: prizeDummyA },
  { id: "j", status: BoardItemStatus.CLOSE },
  { id: "k", status: BoardItemStatus.CLOSE, prize: prizeDummyB },
  { id: "l", status: BoardItemStatus.CLOSE },
  { id: "m", status: BoardItemStatus.CLOSE },
  { id: "n", status: BoardItemStatus.CLOSE, prize: prizeDummyB },
  { id: "o", status: BoardItemStatus.CLOSE },
  { id: "p", status: BoardItemStatus.CLOSE, prize: prizeDummyA },
  { id: "q", status: BoardItemStatus.CLOSE },
];

export { boardItemDummy, prizeListDummy };
