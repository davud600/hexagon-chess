import Settings from "../Settings/Settings";
import Setup from "../Setup/Setup";
import style from "./Header.module.scss"

interface SetupProps
{
    currentUser: string
}
const Header = ({ currentUser }: SetupProps) =>
{
    return(
        <div className={style.headerWrapper}>
            <Settings></Settings>
            <Setup
            currentUser={currentUser}
            ></Setup>
        </div>
    )
}

export default Header;