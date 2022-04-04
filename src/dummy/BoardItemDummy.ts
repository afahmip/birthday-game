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

export { prizeDummyA, prizeDummyB };
