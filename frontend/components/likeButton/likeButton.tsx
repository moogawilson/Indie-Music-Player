"use client";
import { usePlayer } from "@/context/PlayerContext";
import { likeSong } from "@/utils/backendAPI";

import Image from "next/image";
import styles from "./likeButton.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LikeButton: React.FC = () => {
  const { currentSong } = usePlayer();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  //the liked status is not fetched from backend,
  // this will need to be changed at some point
  useEffect(() => {
    setLiked(false);
  }, [currentSong]);

  const submitRating = () => {
    if (currentSong != undefined) {
      likeSong(currentSong.id);
      setLiked(true);
    }
  };

  return (
    <div className={styles.likeContainer}>
      <button className={styles.likeText} type="button" onClick={submitRating}>
        {liked ? "Liked" : "like"}
        <Image
          className={styles.likeImage}
          src={liked ? "/heart.png" : "/like.png"}
          alt="like button"
          width={50}
          height={50}
        ></Image>
      </button>
    </div>
  );
};

export default LikeButton;
