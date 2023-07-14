import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Header from "~/components/Header/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header currentUser="Rinor"></Header>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
