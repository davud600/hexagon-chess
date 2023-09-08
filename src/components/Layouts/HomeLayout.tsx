import Home from "../Home/Home";
import styles from "./HomeLayout.module.scss";

const HomeLayout = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Home />
    </div>
  );
};

export default HomeLayout;
