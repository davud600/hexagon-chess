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
import { GameModes } from "~/SettingsObjects";
import {
  type SelectedPieceType,
  type BoardType,
  type Move,
  type PieceColor,
} from "~/types/board";
import { aiGetMove } from "~/utils/board/ai";
import { getGameResult } from "~/utils/board/board";
import { getLegalMovesFromBoard } from "~/utils/board/moves";
import { useSettings } from "./GameSettingsContext";

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
    moves: getLegalMovesFromBoard(InitialBoard, Pieces.white),
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
  const { gameMode, aiColor } = useSettings();

  const [board, setBoard] = useState<BoardType>(InitialBoard);
  const [selectedPiece, setSelectedPiece] = useState<SelectedPieceType | null>(
    null
  );
  const [colorToMove, setColorToMove] = useState<PieceColor>(Pieces.white);
  const [moves, setMoves] = useState<Move[]>(
    getLegalMovesFromBoard(board, colorToMove)
  );

  useEffect(() => {
    setMoves(getLegalMovesFromBoard(board, colorToMove));
  }, [board, colorToMove]);

  useEffect(() => {
    if (gameMode === GameModes.LocalMultiPlayer) return;

    // Local vs ai...
    if (colorToMove === aiColor) {
      const aiMove = aiGetMove(moves);

      console.log(aiMove);

      makeMove(aiMove.targetPosIndex, aiMove.startPosIndex);
    }

    if (moves.length > 0) return;

    const gameRes = getGameResult(board, colorToMove);

    if (gameRes === 0) {
      console.log("draw");
      return;
    }

    console.log(`winner: ${gameRes}`);
  }, [moves]);

  const makeMove = (index: number, startPosIndex?: number) => {
    if (startPosIndex !== undefined) {
      setBoard((prevBoard) => {
        const updatedBoard = [...prevBoard];
        updatedBoard[startPosIndex] = 0;
        updatedBoard[index] = prevBoard[startPosIndex] as unknown as number;
        return updatedBoard;
      });
    } else {
      setBoard((prevBoard) => {
        if (selectedPiece === null) return prevBoard;

        const updatedBoard = [...prevBoard];
        updatedBoard[selectedPiece.posIndex] = 0;
        updatedBoard[index] = selectedPiece.pieceValue;
        setSelectedPiece(null);
        return updatedBoard;
      });
    }

    setColorToMove((prevColorToMove) =>
      prevColorToMove === Pieces.white ? Pieces.black : Pieces.white
    );
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
