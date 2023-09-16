import Link from "next/link";
import Settings from "../Settings/Settings";
import Setup from "../Setup/Setup";
import style from "./Header.module.scss";
import Image from "next/image";

interface SetupProps {
  currentUser: string;
}
const Header = ({ currentUser }: SetupProps) => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.accessibility}>
        <Link href="/">
          <Image
            src={"/confrontation.png"}
            height={100}
            width={100}
            alt="no queen"
          />
        </Link>
        <Settings />
        <Link href="/tutorial" className={style.link}>
          Tutorial
        </Link>
      </div>
      <Setup currentUser={currentUser}></Setup>
    </div>
  );
};

export default Header;
