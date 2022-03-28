enum BoardItemStatus {
  OPEN,
  CLOSE,
}

interface BoardItemPrize {
  id: string;
  name: string;
  image: string;
  hiddenIcon: string;
}

export { BoardItemStatus };
export type { BoardItemPrize };
