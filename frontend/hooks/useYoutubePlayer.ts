import { useRef, useEffect, useState } from "react";
import { Song } from "@/utils/backendAPI";

export const useYouTubePlayer = (
  song: Song | undefined,
  onSongFinish: () => void
) => {
  const [player, setPlayer] = useState<any>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const createPlayer = () => {
      const p = new window.YT.Player(playerRef.current!, {
        height: "500",
        width: "500",
        videoId: song?.id || "",
        playerVars: { controls: 0 },
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setIsFinished(true);
              onSongFinish();
            }
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  useEffect(() => {
    if (playerReady && player && song?.id) {
      setIsFinished(false);
      player.loadVideoById(song.id);
    }
  }, [song?.id, playerReady, player]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (!player) return;
      const t = player.getCurrentTime();
      const d = player.getDuration();
      setCurrentTime(t);
      setDuration(d);
      setProgress((t / d) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const handleProgressChange = (newTime: number | number[]) => {
    if (!player || Array.isArray(newTime)) return;
    player.seekTo(newTime);
    setCurrentTime(newTime);
  };

  return {
    playerRef,
    playerReady,
    isPlaying,
    togglePlay,
    handleProgressChange,
    currentTime,
    duration,
    isFinished,
  };
};
