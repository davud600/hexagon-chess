import Image from "next/image";
import { useBoard } from "~/context/BoardContext";
import { getPieceColor } from "~/utils/board/piece";

export default function BoardPiece({ index }: { index: number }) {
  const { BoardState, SelectedPieceState } = useBoard();

  const pieceValue = BoardState.board[index];
  if (!!!pieceValue || BoardState.board[index] === 0) return <></>;

  // Get Piece Image
  const bin = (pieceValue >>> 0).toString(2);
  const imgSrc = `pieces-basic-svg/${bin}.svg`;

  const handleOnDragStart = () => {
    if (
      !!SelectedPieceState.selectedPiece &&
      getPieceColor(SelectedPieceState.selectedPiece.pieceValue) !==
        getPieceColor(pieceValue)
    )
      return;
    SelectedPieceState.setSelectedPiece({ pieceValue, posIndex: index });
  };

  const handleOnClick = () => {
    if (
      !!SelectedPieceState.selectedPiece &&
      getPieceColor(SelectedPieceState.selectedPiece.pieceValue) !==
        getPieceColor(pieceValue)
    )
      return;
    SelectedPieceState.setSelectedPiece({ pieceValue, posIndex: index });
  };

  return (
    <div
      draggable={true}
      onDragStart={handleOnDragStart}
      onClick={handleOnClick}
      className="absolute flex h-full w-full items-center justify-center"
    >
      <Image
        className="absolute z-20 rotate-[-30deg]"
        src={imgSrc}
        alt="Piece"
        width={50}
        height={50}
        placeholder="empty"
        priority
      />
    </div>
  );
}
