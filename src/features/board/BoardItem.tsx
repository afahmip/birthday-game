import { MouseEventHandler, ReactNode } from "react";
import { BoardItemStatus, BoardItemPrize } from "./BoardItemTypes";
import defaultIcon from "../../assets/board_item_hidden.svg";
import "./board.css";

type BoardItemProps = {
  id: string;
  status?: BoardItemStatus;
  prize?: BoardItemPrize;
  onStatusChange?: MouseEventHandler;
};

const emptyIcon: string =
  "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";

const BoardItem = (props: BoardItemProps) => {
  const renderImage = (
    prize?: BoardItemPrize,
    status?: BoardItemStatus
  ): ReactNode => {
    if (status === BoardItemStatus.CLOSE) {
      return (
        <img className="justify-center items-center" src={defaultIcon} alt="" />
      );
    } else {
      if (prize === undefined) {
        return (
          <img
            className="board-item-zonk justify-center items-center"
            src={emptyIcon}
            alt=""
          />
        );
      } else {
        return (
          <img
            className="board-item-gift justify-center items-center"
            src={prize.hiddenIcon}
            alt=""
          />
        );
      }
    }
  };

  return (
    <div
      onClick={props.onStatusChange}
      className="basis-1/4 cursor-pointer p-0.5 flex"
    >
      <div className="board-item-spot p-1.5 rounded-md">
        {renderImage(props.prize, props.status)}
      </div>
    </div>
  );
};

export type { BoardItemProps };
export { BoardItem, BoardItemStatus };
