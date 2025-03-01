"use client";
import { fetchLikedSongs } from "@/utils/backendAPI";
import Link from "next/link";

import styles from "./selectionMenu.module.css";

export const SelectionMenu: React.FC = () => {
  return (
    <div className={styles.selectionMenu}>
      <Link href="/" className={styles.text}>
        Home
      </Link>
      <Link href="trending" className={styles.text}>
        Trending
      </Link>
      <Link href="/" className={styles.text}>
        Top Artists
      </Link>
      <Link href="/latest" className={styles.text}>
        Latest
      </Link>
      <Link href="/liked" className={styles.text}>
        Liked
      </Link>
    </div>
  );
};
