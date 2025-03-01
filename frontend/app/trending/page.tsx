"use client";
import { fetchLikedSongs } from "@/utils/backendAPI";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Song } from "@/utils/backendAPI";
import styles from "./page.module.css";
import { fetchTopSongs } from "@/utils/backendAPI";

import SongList from "@/components/songList/SongList";
export default function Page() {
  const [topSongs, setTopSongs] = useState<Song[]>();
  useEffect(() => {
    async function getTopSongs() {
      const topSongs = await fetchTopSongs();
      setTopSongs(topSongs);
    }

    getTopSongs();
  }, []);

  return (
    <div className={styles.songsContainer}>
      <div className={styles.topBanner}>
        <Image
          className={styles.likeImage}
          src={"/trending.png"}
          alt="like button"
          width={200}
          height={200}
        ></Image>
        <h1 className={styles.text}>the popular shit</h1>
      </div>
      <SongList songs={topSongs} />
    </div>
  );
}
