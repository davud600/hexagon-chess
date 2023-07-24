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
import { getFenFromBoard } from "~/utils/board/board";
import { getLegalMovesFromBoard } from "~/utils/board/moves";

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
  BoardHistoryState: {
    boardHistory: string[];
    setBoardHistory: Dispatch<SetStateAction<string[]>>;
  };
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
    moves: getLegalMovesFromBoard(InitialBoard, Pieces.white),
    setMoves: () => false,
  },
  ColorToMoveState: {
    colorToMove: Pieces.white,
    setColorToMove: () => false,
  },
  makeMove: () => false,
  BoardHistoryState: {
    boardHistory: [],
    setBoardHistory: () => false,
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
  const [colorToMove, setColorToMove] = useState<PieceColor>(Pieces.white);
  const [moves, setMoves] = useState<Move[]>(
    getLegalMovesFromBoard(board, colorToMove)
  );
  const [boardHistory, setBoardHistory] = useState<string[]>([]);

  useEffect(() => {
    setMoves(getLegalMovesFromBoard(board, colorToMove));
  }, [board, colorToMove]);

  useEffect(() => {
    setBoardHistory((prevBoardHistory) => {
      const updatedBoardHistory = [...prevBoardHistory];

      updatedBoardHistory.push(getFenFromBoard(board));

      return updatedBoardHistory;
    });
  }, [board]);

  useEffect(() => {
    console.log({ boardHistory });
  }, [boardHistory]);

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
    BoardHistoryState: {
      boardHistory,
      setBoardHistory,
    },
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
