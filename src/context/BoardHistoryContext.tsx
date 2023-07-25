import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import { getBoardFromFEN, getFenFromBoard } from "~/utils/board/board";
import { useBoard } from "./BoardContext";

type BoardHistoryData = {
  BoardHistoryState: {
    boardHistory: string[];
    setBoardHistory: Dispatch<SetStateAction<string[]>>;
  };
  viewPreviousBoardInHistory: () => void;
  viewNextBoardInHistory: () => void;
  isViewingHistory: () => boolean;
};

const BoardHistoryContext = createContext<BoardHistoryData>({
  BoardHistoryState: {
    boardHistory: [],
    setBoardHistory: () => false,
  },
  viewPreviousBoardInHistory: () => false,
  viewNextBoardInHistory: () => false,
  isViewingHistory: () => false,
});

export function useBoardHistory() {
  return useContext(BoardHistoryContext);
}

export default function BoardHistoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { BoardState, MovesState } = useBoard();

  const [boardHistory, setBoardHistory] = useState<string[]>([
    getFenFromBoard(BoardState.board),
  ]);
  const [viewingBoardIndex, setViewingBoardIndex] = useState<number>(0);

  useEffect(() => {
    if (isViewingHistory()) return;

    setBoardHistory((prevBoardHistory) => {
      const updatedBoardHistory = [...prevBoardHistory];
      const currentBoardFen = getFenFromBoard(BoardState.board);

      if (
        updatedBoardHistory[updatedBoardHistory.length - 1] !== currentBoardFen
      ) {
        updatedBoardHistory.push(currentBoardFen);
        setViewingBoardIndex(updatedBoardHistory.length - 1);
      }

      return updatedBoardHistory;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BoardState.board]);

  useEffect(() => {
    BoardState.setBoard(
      getBoardFromFEN(boardHistory[viewingBoardIndex] as unknown as string)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingBoardIndex]);

  useEffect(() => {
    if (isViewingHistory() && MovesState.moves.length > 0)
      MovesState.setMoves([]);
  }, [MovesState.moves]);

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
    BoardHistoryState: {
      boardHistory,
      setBoardHistory,
    },
    viewPreviousBoardInHistory,
    viewNextBoardInHistory,
    isViewingHistory,
  };

  return (
    <BoardHistoryContext.Provider value={value}>
      {children}
    </BoardHistoryContext.Provider>
  );
}
