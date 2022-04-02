import { useEffect, useState } from "react";
import { wait } from "../../common/GenericFunctions";
import { BoardItemPrize } from "../board/BoardItemTypes";

type GiftSpotLightProps = {
  prize: BoardItemPrize;
  onFinish: () => void;
};

const GiftSpotLight = (props: GiftSpotLightProps) => {
  const [shakeClass, setShakeClass] = useState("hidden-gift-entrance");
  const [isExploding, setIsExploding] = useState(false);
  const { prize, onFinish } = props;

  useEffect(() => {
    animate();
  }, []);

  const animate = async () => {
    await wait(3000);
    setShakeClass("hidden-gift-shake");
    await wait(3000);
    setIsExploding(true);
    await wait(800);
    onFinish();
  };

  return (
    <div className="hidden-gift">
      {isExploding ? (
        <div className="explosion-wrapper h-screen w-screen absolute">
          <div className="explosion h-screen w-screen absolute" />
        </div>
      ) : null}
      <div className="hidden-gift-content w-screen h-screen flex flex-col justify-end items-center">
        <div className="stage-highlight" />
        <div className="stage-shadow" />
        <img
          className={`w-1/2 mb-16 ${shakeClass}`}
          src={prize.hiddenIcon}
          alt=""
        />
        <div className="lamp-wrapper w-screen h-screen flex flex-col justify-end items-center">
          <div className="lamp" />
          <div className="lamp lamp-2" />
        </div>
      </div>
    </div>
  );
};

export { GiftSpotLight };
