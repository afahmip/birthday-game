import { useEffect, useState } from "react";
import { wait } from "../../common/GenericFunctions";
import { BoardItemPrize } from "../board/BoardItemTypes";
import starburst from "../../assets/starburst.png";

const PRIZE_IMG_INTRO: string = "prize-img-entrance";
const PRIZE_IMG_ONGOING: string = "prize-img-ongoing";

type PrizeDetailsProps = {
  prize: BoardItemPrize;
};

const PrizeDetails = (props: PrizeDetailsProps) => {
  const [imgAnimation, setImgAnimation] = useState<string>(PRIZE_IMG_INTRO);
  const { prize } = props;

  useEffect(() => {
    animate();
  });

  const animate = async () => {
    await wait(1500);
    setImgAnimation(PRIZE_IMG_ONGOING);
  };

  return (
    <div className="prize-revealer w-screen h-screen flex flex-col items-center">
      <div className="starburst-wrapper h-screen relative overflow-hidden flex flex-col justify-center items-center">
        <img className="starburst-1 absolute" src={starburst} alt="" />
        <img className="starburst-2 absolute" src={starburst} alt="" />
        <img
          className={`${imgAnimation} prize-img w-1/2 mt-30`}
          src={prize.image}
          alt=""
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center bottom-0 mb-8">
        <h2 className="prize-subtitle tracking-wide text-xl font-semibold mt-11">
          you got
        </h2>
        <h1 className="prize-title tracking-tight font-bold mt-5">
          {prize.name}
        </h1>
        <div className="prize-revealer-desc text-white px-6 py-6 m-4 rounded-lg">
          <p className="text-sm">
            Please screenshot this screen and share to the Gamemaster to redeem
            your prize.
          </p>
          <p className="text-xs mt-5">{Date().toString()}</p>
        </div>
      </div>
    </div>
  );
};

export { PrizeDetails };
