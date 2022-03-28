import { MouseEventHandler, ReactNode } from "react";
import { BoardItemStatus, BoardItemPrize } from "./BoardItemTypes";

type BoardItemProps = {
  id: string;
  status?: BoardItemStatus;
  prize?: BoardItemPrize;
  onStatusChange?: MouseEventHandler;
};

const defaultIcon: string =
  "https://cdn-icons-png.flaticon.com/512/66/66788.png";
const emptyIcon: string =
  "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";

const BoardItem = (props: BoardItemProps) => {
  const renderImage = (
    prize?: BoardItemPrize,
    status?: BoardItemStatus
  ): ReactNode => {
    if (status === BoardItemStatus.CLOSE) {
      return <img src={defaultIcon} alt="" />;
    } else {
      if (prize === undefined) {
        return <img src={emptyIcon} alt="" />;
      } else {
        return <img src={prize.hiddenIcon} alt="" />;
      }
    }
  };

  return (
    <div onClick={props.onStatusChange} className="basis-1/4 cursor-pointer">
      {renderImage(props.prize, props.status)}
    </div>
  );
};

export type { BoardItemProps };
export { BoardItem, BoardItemStatus };
