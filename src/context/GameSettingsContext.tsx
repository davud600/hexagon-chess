import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { Pieces } from "~/BoardObjects";
import { type PieceColor } from "~/types/board";
import { type GameMode } from "~/types/settings";
import { GameModes } from "../SettingsObjects";

type GameSettingsData = {
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
  aiColor: PieceColor | null;
  setAiColor: Dispatch<SetStateAction<PieceColor | null>>;
};

const GameSettingsContext = createContext<GameSettingsData>({
  gameMode: GameModes.LocalVsAi,
  setGameMode: () => false,
  aiColor: Pieces.black,
  setAiColor: () => false,
});

export function useSettings() {
  return useContext(GameSettingsContext);
}

export default function GameSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [gameMode, setGameMode] = useState<GameMode>(GameModes.LocalVsAi);
  const [aiColor, setAiColor] = useState<PieceColor | null>(null);

  useEffect(() => {
    if (gameMode === GameModes.LocalVsAi) setAiColor(Pieces.black);
  }, [gameMode]);

  const value = {
    gameMode,
    setGameMode,
    aiColor,
    setAiColor,
  };

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
}
