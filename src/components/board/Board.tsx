import Image from "next/image";
import { type ModuleColor } from "~/types/board";
import BoardProvider, { useBoard } from "~/context/BoardContext";
import { type DragEvent } from "react";
import { movesIncludeMove } from "~/utils/board";

function BoardPieceComponent({ index }: { index: number }) {
  const { BoardState, SelectedPieceState } = useBoard();

  const pieceValue = BoardState.board[index];

  if (!!!pieceValue) return;

  const bin = (pieceValue >>> 0).toString(2);

  if (BoardState.board[index] === 0) {
    return;
  }

  const imgSrc = `pieces-basic-svg/${bin}.svg`;

  const handleOnDragStart = () => {
    if (!!SelectedPieceState.selectedPiece) return;

    SelectedPieceState.setSelectedPiece({ pieceValue, posIndex: index });
  };

  const handleOnClick = () => {
    if (!!SelectedPieceState.selectedPiece) return;

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
        alt="No White King"
        width={50}
        height={50}
        placeholder="empty"
        priority
      />
    </div>
  );
}

function BoardModule({ index, color }: { index: number; color: ModuleColor }) {
  const { MovesState, SelectedPieceState, makeMove } = useBoard();

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
      !movesIncludeMove(MovesState.moves, {
        startPosIndex: SelectedPieceState.selectedPiece.posIndex,
        targetPosIndex: index,
      })
    ) {
      SelectedPieceState.setSelectedPiece(null);
      return;
    }

    makeMove(index);
  };

  const handleOnClick = () => {
    if (
      SelectedPieceState.selectedPiece === null ||
      SelectedPieceState.selectedPiece === undefined
    )
      return;

    if (
      !movesIncludeMove(MovesState.moves, {
        startPosIndex: SelectedPieceState.selectedPiece.posIndex,
        targetPosIndex: index,
      })
    ) {
      SelectedPieceState.setSelectedPiece(null);
      return;
    }

    makeMove(index);
  };

  let textColor = "";

  MovesState.moves.forEach((move) => {
    if (move.targetPosIndex === index) textColor = "text-red-500";
  });

  return (
    <div
      className={className}
      onDragOver={(e) => handleOnDragOver(e)}
      onDrop={(e) => handleOnDrop(e)}
      onClick={handleOnClick}
    >
      <span
        className={`absolute bottom-0 right-0 z-10 -rotate-[30deg] ${textColor}`}
      >
        {index}
      </span>
      <BoardPieceComponent index={index} />
    </div>
  );
}

export default function BoardComponent() {
  return (
    <BoardProvider>
      <div className="flex h-full w-full items-center justify-center">
        <div className="manehex absolute left-[35%] top-[-50px]">
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <BoardModule index={0} color="dark" />
            <BoardModule index={1} color="neutral" />
            <BoardModule index={2} color="light" />
            <BoardModule index={3} color="dark" />
            <BoardModule index={4} color="neutral" />
            <BoardModule index={5} color="light" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <BoardModule index={6} color="neutral" />
            <BoardModule index={7} color="light" />
            <BoardModule index={8} color="dark" />
            <BoardModule index={9} color="neutral" />
            <BoardModule index={10} color="light" />
            <BoardModule index={11} color="dark" />
            <BoardModule index={12} color="neutral" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <BoardModule index={13} color="light" />
            <BoardModule index={14} color="dark" />
            <BoardModule index={15} color="neutral" />
            <BoardModule index={16} color="light" />
            <BoardModule index={17} color="dark" />
            <BoardModule index={18} color="neutral" />
            <BoardModule index={19} color="light" />
            <BoardModule index={20} color="dark" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <BoardModule index={21} color="dark" />
            <BoardModule index={22} color="neutral" />
            <BoardModule index={23} color="light" />
            <BoardModule index={24} color="dark" />
            <BoardModule index={25} color="neutral" />
            <BoardModule index={26} color="light" />
            <BoardModule index={27} color="dark" />
            <BoardModule index={28} color="neutral" />
            <BoardModule index={29} color="light" />
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <BoardModule index={30} color="neutral" />
            <BoardModule index={31} color="light" />
            <BoardModule index={32} color="dark" />
            <BoardModule index={33} color="neutral" />
            <BoardModule index={34} color="light" />
            <BoardModule index={35} color="dark" />
            <BoardModule index={36} color="neutral" />
            <BoardModule index={37} color="light" />
            <BoardModule index={38} color="dark" />
            <BoardModule index={39} color="neutral" />
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <BoardModule index={40} color="light" />
            <BoardModule index={41} color="dark" />
            <BoardModule index={42} color="neutral" />
            <BoardModule index={43} color="light" />
            <BoardModule index={44} color="dark" />
            <BoardModule index={45} color="neutral" />
            <BoardModule index={46} color="light" />
            <BoardModule index={47} color="dark" />
            <BoardModule index={48} color="neutral" />
            <BoardModule index={49} color="light" />
            <BoardModule index={50} color="dark" />
          </div>
          <div className="linesecter">
            <BoardModule index={51} color="neutral" />
            <BoardModule index={52} color="light" />
            <BoardModule index={53} color="dark" />
            <BoardModule index={54} color="neutral" />
            <BoardModule index={55} color="light" />
            <BoardModule index={56} color="dark" />
            <BoardModule index={57} color="neutral" />
            <BoardModule index={58} color="light" />
            <BoardModule index={59} color="dark" />
            <BoardModule index={60} color="neutral" />
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <BoardModule index={61} color="dark" />
            <BoardModule index={62} color="neutral" />
            <BoardModule index={63} color="light" />
            <BoardModule index={64} color="dark" />
            <BoardModule index={65} color="neutral" />
            <BoardModule index={66} color="light" />
            <BoardModule index={67} color="dark" />
            <BoardModule index={68} color="neutral" />
            <BoardModule index={69} color="light" />
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <BoardModule index={70} color="light" />
            <BoardModule index={71} color="dark" />
            <BoardModule index={72} color="neutral" />
            <BoardModule index={73} color="light" />
            <BoardModule index={74} color="dark" />
            <BoardModule index={75} color="neutral" />
            <BoardModule index={76} color="light" />
            <BoardModule index={77} color="dark" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <BoardModule index={78} color="neutral" />
            <BoardModule index={79} color="light" />
            <BoardModule index={80} color="dark" />
            <BoardModule index={81} color="neutral" />
            <BoardModule index={82} color="light" />
            <BoardModule index={83} color="dark" />
            <BoardModule index={84} color="neutral" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
          <div className="linesecter">
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <BoardModule index={85} color="dark" />
            <BoardModule index={86} color="neutral" />
            <BoardModule index={87} color="light" />
            <BoardModule index={88} color="dark" />
            <BoardModule index={89} color="neutral" />
            <BoardModule index={90} color="light" />
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
            <div className="hexagon hex hidden"></div>
          </div>
        </div>
      </div>
    </BoardProvider>
  );
}
