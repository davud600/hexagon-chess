import { Board } from "~/GameObjects";
import Image from "next/image";

function BoardPieceComponent({ index }: { index: number }) {
  const pieceValue = Board[index];

  if (!!!pieceValue) return;

  const bin = (pieceValue >>> 0).toString(2);

  if (Board[index] === 0) {
    return;
  }

  const imgSrc = `pieces-basic-svg/${bin}.svg`;

  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <Image
        className="absolute z-20 rotate-[-30deg]"
        src={imgSrc}
        alt="No White King"
        width={50}
        height={50}
        priority
        placeholder="empty"
      />
    </div>
  );
}

export default function BoardComponent() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="manehex absolute left-[35%] top-[-50px]">
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={0} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={1} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={2} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={3} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={4} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={5} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={6} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={7} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={8} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={9} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={10} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={11} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={12} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={13} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={14} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={15} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={16} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={17} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={18} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={19} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={20} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={21} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={22} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={23} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={24} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={25} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={26} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={27} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={28} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={29} />
          </div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={30} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={31} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={32} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={33} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={34} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={35} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={36} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={37} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={38} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={39} />
          </div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex light">
            <BoardPieceComponent index={40} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={41} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={42} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={43} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={44} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={45} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={46} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={47} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={48} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={49} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={50} />
          </div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={51} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={52} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={53} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={54} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={55} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={56} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={57} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={58} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={59} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={60} />
          </div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={61} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={62} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={63} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={64} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={65} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={66} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={67} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={68} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={69} />
          </div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={70} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={71} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={72} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={73} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={74} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={75} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={76} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={77} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={78} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={79} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={80} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={81} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={82} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={83} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={84} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
        <div className="linesecter">
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={85} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={86} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={87} />
          </div>
          <div className="hexagon hex dark">
            <BoardPieceComponent index={88} />
          </div>
          <div className="hexagon hex neutral">
            <BoardPieceComponent index={89} />
          </div>
          <div className="hexagon hex light">
            <BoardPieceComponent index={90} />
          </div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
          <div className="hexagon hex hidden"></div>
        </div>
      </div>
    </div>
  );
}
