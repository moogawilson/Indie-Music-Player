// "use client";
import { fetchLikedSongs } from "@/utils/backendAPI";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Song } from "@/utils/backendAPI";
import styles from "./songList.module.css";
import { usePlayer } from "@/context/PlayerContext";
import { processText } from "@/utils/processText";

type songsProps = {
  songs: Song[] | undefined;
};

const SongList: React.FC<songsProps> = ({ songs }) => {
  const { changeSongQueue, changeSong } = usePlayer();

  const playSong = (index: number) => {
    console.log("the index is ", index);
    if (!songs) return;
    changeSongQueue(songs, index);
    // changeSong(index);
  };

  return (
    <div className={styles.list}>
      {songs ? (
        songs.map((song, index) => (
          <button
            className={styles.listItem}
            type="button"
            onClick={() => playSong(index)}
          >
            <div className={styles.thumbnailContainer}>
              <Image
                src={`https://img.youtube.com/vi/${song.id}/default.jpg`}
                alt="..."
                className={styles.thumbnailImage}
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <h1 className={styles.songName} key={song.id}>
              {song.title}
            </h1>
            {/* <h3 className={styles.songName}>{song.artistName}</h3> */}
            {/* </div> */}
          </button>
        ))
      ) : (
        <h1>Loadinggggggg waittttttt...</h1>
      )}
    </div>
  );
};

export default SongList;
