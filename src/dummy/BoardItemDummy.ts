import { BoardItemProps } from "../features/board/BoardItem";
import { BoardItemStatus } from "../features/board/BoardItemTypes";
import { Prize } from "../features/prize/PrizeTypes";
import giftIconA from "../assets/gift_1.png";
import giftIconB from "../assets/gift_2.png";
import prizeImgA from "../assets/prize_sample.png";

const prizeDummyA: Prize = {
  id: "prize-a",
  name: "Prize A",
  image: prizeImgA,
  hiddenIcon: giftIconA,
};

const prizeDummyB: Prize = {
  id: "prize-b",
  name: "Wild Card",
  image: prizeImgA,
  hiddenIcon: giftIconB,
};

type PrizeList = { [id: string]: Prize };

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
