import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  type ReactNode,
  useContext,
  useEffect,
} from "react";
import { Board as InitialBoard, Pieces } from "~/BoardObjects";
import {
  type SelectedPieceType,
  type BoardType,
  type Move,
  type PieceColor,
} from "~/types/board";
import { getMovesFromBoard } from "~/utils/board";

type BoardContextData = {
  BoardState: {
    board: BoardType;
    setBoard: Dispatch<SetStateAction<BoardType>>;
  };
  SelectedPieceState: {
    selectedPiece: SelectedPieceType | null;
    setSelectedPiece: Dispatch<SetStateAction<SelectedPieceType | null>>;
  };
  MovesState: {
    moves: Move[];
    setMoves: Dispatch<SetStateAction<Move[]>>;
  };
  ColorToMoveState: {
    colorToMove: PieceColor;
    setColorToMove: Dispatch<SetStateAction<PieceColor>>;
  };
  makeMove: (index: number) => void;
};

const BoardContext = createContext<BoardContextData>({
  BoardState: {
    board: InitialBoard,
    setBoard: () => false,
  },
  SelectedPieceState: {
    selectedPiece: null,
    setSelectedPiece: () => false,
  },
  MovesState: {
    moves: getMovesFromBoard(InitialBoard, Pieces.white),
    setMoves: () => false,
  },
  ColorToMoveState: {
    colorToMove: Pieces.white,
    setColorToMove: () => false,
  },
  makeMove: () => false,
});

export function useBoard() {
  return useContext(BoardContext);
}

export default function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<BoardType>(InitialBoard);
  const [selectedPiece, setSelectedPiece] = useState<SelectedPieceType | null>(
    null
  );
  const [colorToMove, setColorToMove] = useState<PieceColor>(Pieces.white);
  const [moves, setMoves] = useState<Move[]>(
    getMovesFromBoard(board, colorToMove)
  );

  useEffect(() => {
    setMoves(getMovesFromBoard(board, colorToMove));
  }, [board, colorToMove]);

  const makeMove = (index: number) => {
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      updatedBoard[selectedPiece!.posIndex] = 0;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      updatedBoard[index] = selectedPiece!.pieceValue;
      setSelectedPiece(null);
      return updatedBoard;
    });

    setColorToMove((prevColorToMove) => {
      return prevColorToMove === Pieces.white ? Pieces.black : Pieces.white;
    });
  };

  const value = {
    BoardState: {
      board,
      setBoard,
    },
    SelectedPieceState: {
      selectedPiece,
      setSelectedPiece,
    },
    MovesState: {
      moves,
      setMoves,
    },
    ColorToMoveState: {
      colorToMove,
      setColorToMove,
    },
    makeMove,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
