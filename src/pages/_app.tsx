import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "~/styles/hexagonal-grid.css";
import Header from "~/components/Header/Header";
import GameSettingsProvider from "~/context/GameSettingsContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Header currentUser="Rinor"></Header>
      <GameSettingsProvider>
        <Component {...pageProps} />
      </GameSettingsProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
