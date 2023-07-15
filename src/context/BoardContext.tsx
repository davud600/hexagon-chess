import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  type ReactNode,
  useContext,
  useEffect,
} from "react";
import { Board as InitialBoard } from "~/GameObjects";
import { type SelectedPieceType, type BoardType } from "~/types/board";

type BoardContextData = {
  BoardState: {
    board: BoardType;
    setBoard: Dispatch<SetStateAction<BoardType>>;
  };
  SelectedPieceState: {
    selectedPiece: SelectedPieceType | null;
    setSelectedPiece: Dispatch<SetStateAction<SelectedPieceType | null>>;
  };
};

const BoardContext = createContext<BoardContextData>({
  BoardState: {
    board: [],
    setBoard: () => false,
  },
  SelectedPieceState: {
    selectedPiece: null,
    setSelectedPiece: () => false,
  },
});

export function useBoard() {
  return useContext(BoardContext);
}

export default function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<BoardType>(InitialBoard);
  const [selectedPiece, setSelectedPiece] = useState<SelectedPieceType | null>(
    null
  );

  const value = {
    BoardState: {
      board,
      setBoard,
    },
    SelectedPieceState: {
      selectedPiece,
      setSelectedPiece,
    },
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
