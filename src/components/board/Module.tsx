import { Move, type ModuleColor } from "~/types/board";
import { useBoard } from "~/context/BoardContext";
import { type DragEvent } from "react";
import { movesIncludeMove } from "~/utils/board/board";
import { getPieceColor } from "~/utils/board/piece";
import BoardPiece from "./Piece";

export default function BoardModule({
  index,
  color,
}: {
  index: number;
  color: ModuleColor;
}) {
  const { MovesState, SelectedPieceState, BoardState, makeMove } = useBoard();

  // Whether the piece should be highlighted
  if (SelectedPieceState.selectedPiece?.posIndex === index) {
    color = "selected";
  } else {
    MovesState.moves.forEach((move) => {
      if (
        move.targetPosIndex === index &&
        move.startPosIndex === SelectedPieceState.selectedPiece?.posIndex
      )
        color = "legal";
    });
  }
  const className = `hexagon hex ${color}`;

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (
      SelectedPieceState.selectedPiece === null ||
      SelectedPieceState.selectedPiece === undefined
    )
      return;

    if (
      verifyMove(
        MovesState.moves,
        SelectedPieceState.selectedPiece.posIndex,
        index
      )
    )
      makeMove(index);
  };

  const handleOnClick = () => {
    if (
      SelectedPieceState.selectedPiece === null ||
      SelectedPieceState.selectedPiece === undefined
    )
      return;

    if ((BoardState.board[index] || -1) > 0) {
      if (
        getPieceColor(SelectedPieceState.selectedPiece.pieceValue) ===
        getPieceColor(BoardState.board[index] as unknown as number)
      ) {
        SelectedPieceState.setSelectedPiece({
          pieceValue: BoardState.board[index] as unknown as number,
          posIndex: index,
        });
        return;
      }
    }

    if (
      verifyMove(
        MovesState.moves,
        SelectedPieceState.selectedPiece.posIndex,
        index
      )
    )
      makeMove(index);
  };

  const verifyMove = (
    moves: Move[],
    startPosIndex: number,
    targetPosIndex: number
  ): boolean => {
    if (
      !movesIncludeMove(moves, {
        startPosIndex,
        targetPosIndex,
      })
    ) {
      SelectedPieceState.setSelectedPiece(null);
      return false;
    }

    return true;
  };

  return (
    <div
      className={className}
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleOnDrop(e)}
      onClick={handleOnClick}
    >
      <BoardPiece index={index} />
    </div>
  );
}
