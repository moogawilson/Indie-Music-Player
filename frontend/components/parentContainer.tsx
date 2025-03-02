import NavBar from "@/components/navBar/navBar";

import LikeButton from "@/components/likeButton/likeButton";
import SongQueue from "@/components/SongQueue/SongQueue";
import { SelectionMenu } from "@/components/selectionMenu/selectionMenu";
import styles from "./parentContainer.module.css";
import YoutubePlayer from "./youtubePlayer/youtubePlayer";
import PlayerControls from "./youtubePlayer/PlayerControls";
import SongInfo from "./songInfo/songInfo";
import RandomBox from "./randomBox/randomBox";
import Background from "./background/background";
export default async function ParentContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Background />
      <div className={styles.container}>
        <div className={styles.navBar}>
          <NavBar />
        </div>

        <div className={styles.nestedFlex}>
          <div className={styles.songQueue}>
            <SongQueue />
          </div>
          <div className={styles.nestedFlexToo}>
            <div className={styles.SelectionMenu}>
              <SelectionMenu />
            </div>
            <div className={styles.randomContainer}>
              <div className={styles.randomContainerToo}>
                <div className={styles.randomBox}>{children}</div>

                <div className={styles.playerLikeContainer}>
                  <div className={styles.youtubeWindow}>
                    <YoutubePlayer />
                  </div>

                  <div className={styles.songInfo}>
                    <SongInfo />
                  </div>
                  <div className={styles.likeStuff}>
                    {" "}
                    <LikeButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.playerControls}>
          <PlayerControls />
        </div>
      </div>
    </div>
  );
}
