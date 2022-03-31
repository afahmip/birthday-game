import "./prize.css";
import { BoardItemPrize } from "../board/BoardItemTypes";

/*
 * Camera icon credits to https://free3dicon.com/
 */

type PrizeRevealerProps = {
  prize: BoardItemPrize;
};

const PrizeRevealer = (props: PrizeRevealerProps) => {
  const { prize } = props;
  return (
    <div className="prize-revealer w-screen h-screen flex flex-col justify-center items-center">
      <img className="w-1/2 mt-30" src={prize.image} alt="" />
      <h2 className="tracking-wide text-xl font-semibold mt-11">you got</h2>
      <h1 className="tracking-tight font-bold mt-5">{prize.name}</h1>
      <div className="prize-revealer-desc px-6 py-6 m-4 rounded-lg">
        <p className="text-sm">
          Please screenshot this screen and share to the Gamemaster to redeem
          your prize.
        </p>
        <p>{Date().toString()}</p>
      </div>
    </div>
  );
};

export { PrizeRevealer };
