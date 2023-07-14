import Home from "../Home/Home";
import styles from "./RenderHomeLayout.module.scss"

const RenderHome = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Home></Home>
    </div>
  );
}

export default RenderHome;