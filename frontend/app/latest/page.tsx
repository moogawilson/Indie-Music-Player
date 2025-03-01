"use client";
import { useEffect, useState } from "react";
import { Song } from "@/utils/backendAPI";
import styles from "./page.module.css";
import { fetchLatestSongs } from "@/utils/backendAPI";
import Image from "next/image";

import SongList from "@/components/songList/SongList";
export default function Page() {
  const [latestSongs, setLatestSongs] = useState<Song[]>();
  useEffect(() => {
    async function getLatestSongs() {
      const latestSongs = await fetchLatestSongs();
      setLatestSongs(latestSongs);
    }

    getLatestSongs();
  }, []);

  return (
    <div className={styles.songsContainer}>
      <div className={styles.topBanner}>
        <Image
          className={styles.likeImage}
          src={"/latest.png"}
          alt="like button"
          width={200}
          height={200}
        ></Image>
        <h1 className={styles.text}>the new shit</h1>
      </div>
      <SongList songs={latestSongs} />
    </div>
  );
}
