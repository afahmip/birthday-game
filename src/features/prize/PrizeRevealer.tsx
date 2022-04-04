import { useState } from "react";
import { GiftSpotLight } from "./GiftSpotLight";
import { PrizeDetails } from "./PrizeDetails";
import { Prize } from "./PrizeTypes";
import "./prize.css";

/*
 * Camera icon credits to https://free3dicon.com/
 */

type PrizeRevealerProps = {
  prize: Prize;
};

const PrizeRevealer = (props: PrizeRevealerProps) => {
  const [introShown, setIntroShown] = useState<boolean>(false);
  const { prize } = props;

  const onFinish = () => {
    setIntroShown(true);
  };

  return (
    <>
      {introShown ? (
        <PrizeDetails prize={prize} />
      ) : (
        <GiftSpotLight prize={prize} onFinish={onFinish} />
      )}
    </>
  );
};

export { PrizeRevealer };
