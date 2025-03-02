"use client";
import React, { createContext, useContext } from "react";
import { Song } from "@/utils/backendAPI";
import { useSongQueue } from "@/hooks/useSongQueue";
import { useYouTubePlayer } from "@/hooks/useYoutubePlayer";
import { songMode } from "@/hooks/useSongQueue";
//todoo use different contexts for different things

interface PlayerContextProps {
  onSongFinish: () => void;
  currentSong: Song | undefined;
  songQueue: Song[];
  currentSongPosition: number;
  skipSong: (positionChange: number) => void;
  changeSong: (newPosition: number) => void;
  changeSongMode: (mode: songMode) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  currentTime: number;
  handleProgressChange: (newTime: number | number[]) => void;
  duration: number;
  playerReady: boolean;
  playerRef: React.MutableRefObject<any>;
  isFinished: boolean;
  changeSongQueue: (songs: Song[], position: number) => void;
}

interface PlayerProviderProps {
  children: React.ReactNode; // Define `children` explicitly here
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const {
    currentSong,
    songQueue,
    currentSongPosition,
    changeSongMode,
    skipSong,
    changeSong,
    onSongFinish,
    changeSongQueue,
  } = useSongQueue();
  const {
    isPlaying,
    togglePlay,
    handleProgressChange,
    currentTime,
    duration,
    playerReady,
    playerRef,
    isFinished,
  } = useYouTubePlayer(currentSong, onSongFinish);
  return (
    <PlayerContext.Provider
      value={{
        onSongFinish,
        currentSong,
        songQueue,
        currentSongPosition,
        skipSong,
        changeSong,
        changeSongMode,
        isPlaying,
        togglePlay,
        currentTime,
        handleProgressChange,
        duration,
        playerReady,
        playerRef,
        isFinished,
        changeSongQueue,
      }}
    >
      {children}{" "}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
