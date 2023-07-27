import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { GameMode } from "~/types/settings";
import { GameModes } from "../SettingsObjects";

type GameSettingsData = {
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

const GameSettingsContext = createContext<GameSettingsData>({
  gameMode: GameModes.LocalMultiPlayer,
  setGameMode: () => false,
});

export function useSettings() {
  return useContext(GameSettingsContext);
}

export default function GameSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameMode, setGameMode] = useState<GameMode>(
    GameModes.LocalMultiPlayer
  );

  const value = {
    gameMode,
    setGameMode,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
}
