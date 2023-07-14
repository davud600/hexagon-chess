import Image from "next/image";
import "../../../public/homeLogo.svg";
import style from "./Home.module.scss";
import GameOptions from "./GameOptions";
export default function Home() {
  return (
    <div className={style.layoutWrapper}>
      <Image
        src={"homeLogo.svg"}
        alt="No Image"
        width={800}
        height={400}
      ></Image>
      <Image
        src={"pawnDownSideSvg.svg"}
        alt="No Pawn"
        width={600}
        height={600}
        className={style.downSidePawn}
      />
      <Image
        src={"upSidePawnSvg.svg"}
        alt="No Pawn"
        width={600}
        height={600}
        className={style.upSidePawn}
      />
      <GameOptions />
    </div>
  );
}
