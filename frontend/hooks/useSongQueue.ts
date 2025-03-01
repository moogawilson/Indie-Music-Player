"use client";
import { useEffect, useState } from "react";
import { Song } from "@/utils/backendAPI";
import { fetchSongList } from "@/utils/backendAPI";
import { formatSongs } from "@/utils/processText";

interface SongQueueHook {
  currentSong: Song | undefined;
  songQueue: Song[];
  currentSongPosition: number;
  changeSongMode: (mode: songMode) => void;
  skipSong: (positionChange: number) => void;
  changeSong: (newPosition: number) => void;
  onSongFinish: () => void;
  changeSongQueue: (songs: Song[], position: number) => void;
}

export type songMode = "discovery" | "normal";

export const useSongQueue = (): SongQueueHook => {
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [currentSongPosition, setCurrentSongPosition] = useState(0);
  const [currentSong, setCurrentSong] = useState<Song>();

  const [songMode, setSongMode] = useState<songMode>("normal");

  useEffect(() => {
    if (songQueue.length == 0) {
      fetchSongs(songMode);
    }
  }, []);

  const changeSongQueue = (songs: Song[], position = 0) => {
    setSongQueue(songs);
    //have to do this with songs, since songqueue wont be updated yet
    //this isn't great
    setCurrentSongPosition(position);
    setCurrentSong(songs[position]);
  };

  const fetchSongs = async (newMode: songMode) => {
    const songObjects = await fetchSongList("1", newMode);
    const formattedSongs = formatSongs(songObjects);

    setSongQueue(formattedSongs);
    setCurrentSong(formattedSongs[currentSongPosition]);
  };

  const changeSongMode = (newMode: songMode) => {
    console.log(newMode);
    setSongMode(newMode);
    fetchSongs(newMode);
  };

  const skipSong = (positionChange: number) => {
    setCurrentSongPosition((prevPosition) => {
      const newPosition = prevPosition + positionChange;
      if (newPosition < 0 || newPosition >= songQueue.length) {
        console.warn("Position out of bounds:", newPosition);
        return prevPosition;
      }
      setCurrentSong(songQueue[newPosition]);
      return newPosition;
    });
  };

  const changeSong = (newPosition: number) => {
    setCurrentSongPosition(newPosition);
    setCurrentSong(songQueue[newPosition]);
  };

  const onSongFinish = () => {
    skipSong(1);
  };

  return {
    currentSong,
    songQueue,
    currentSongPosition,
    changeSongMode,
    skipSong,
    changeSong,
    onSongFinish,
    changeSongQueue,
  };
};
