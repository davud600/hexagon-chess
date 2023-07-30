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
import {
  getBoardFromFEN,
  getFenFromBoard,
  getGameResult,
} from "~/utils/board/board";
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
  HistoryState: {
    boardHistory: string[];
    setBoardHistory: Dispatch<SetStateAction<string[]>>;
  };
  viewPreviousBoardInHistory: () => void;
  viewNextBoardInHistory: () => void;
  isViewingHistory: () => boolean;
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
  HistoryState: {
    boardHistory: [],
    setBoardHistory: () => false,
  },
  viewPreviousBoardInHistory: () => false,
  viewNextBoardInHistory: () => false,
  isViewingHistory: () => false,
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
  const [boardHistory, setBoardHistory] = useState<string[]>([
    getFenFromBoard(board),
  ]);
  const [viewingBoardIndex, setViewingBoardIndex] = useState<number>(0);

  /** Updaing Legal Moves */
  useEffect(() => {
    setMoves(getLegalMovesFromBoard(board, colorToMove));
  }, [board, colorToMove]);

  /** Determining end of game and ai caller */
  useEffect(() => {
    if (gameMode === GameModes.LocalMultiPlayer) return;

    // Local vs ai...
    if (colorToMove === aiColor) {
      const aiMove = aiGetMove(moves, board, aiColor);

      if (aiMove === undefined) return;

      makeMove(aiMove.targetPosIndex, aiMove.startPosIndex);
    }

    if (isViewingHistory()) return;

    const gameRes = getGameResult(board, colorToMove, moves);

    if (gameRes === 1) return; // game hasn't ended

    if (gameRes === 0) {
      console.log("stalemate");
      return;
    }

    console.log(`winner: ${gameRes}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves]);

  /** Updating Board History when board changes */
  useEffect(() => {
    if (isViewingHistory()) return;

    setBoardHistory((prevBoardHistory) => {
      const updatedBoardHistory = [...prevBoardHistory];
      const currentBoardFen = getFenFromBoard(board);

      if (
        updatedBoardHistory[updatedBoardHistory.length - 1] !== currentBoardFen
      ) {
        updatedBoardHistory.push(currentBoardFen);
        setViewingBoardIndex(updatedBoardHistory.length - 1);
      }

      return updatedBoardHistory;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  /** Updating board when viewing history */
  useEffect(() => {
    if (!isViewingHistory()) return;

    setBoard(
      getBoardFromFEN(boardHistory[viewingBoardIndex] as unknown as string)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingBoardIndex]);

  /** Remove all legal moves if viewing history so players can't move */
  useEffect(() => {
    if (isViewingHistory() && moves.length > 0) setMoves([]);
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

  /** History state methods */
  const viewPreviousBoardInHistory = () => {
    if (boardHistory.length <= 1 || viewingBoardIndex < 1) return;

    setViewingBoardIndex((prevViewingBoardIndex) => prevViewingBoardIndex - 1);
  };

  const viewNextBoardInHistory = () => {
    if (viewingBoardIndex >= boardHistory.length - 1) return;

    setViewingBoardIndex((prevViewingBoardIndex) => prevViewingBoardIndex + 1);
  };

  const isViewingHistory = () => {
    return viewingBoardIndex < boardHistory.length - 1;
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
    HistoryState: {
      boardHistory,
      setBoardHistory,
    },
    viewPreviousBoardInHistory,
    viewNextBoardInHistory,
    isViewingHistory,
    makeMove,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}
