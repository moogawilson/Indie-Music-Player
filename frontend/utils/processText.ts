import he from "he";
import { Song } from "./backendAPI";

export const processText = (field: string) => {
  const decodedField = he.decode(field);
  return decodedField.length > 30
    ? decodedField.slice(0, 27) + "..."
    : decodedField;
};

export const formatSongs = (songs: Song[]) => {
  const formatDate = (date: string): string => {
    const publishedTime = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - publishedTime.getTime();

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return songs.map((song) => ({
    ...song,
    title: processText(song.title),
    artistName: processText(song.artistName.replace(/- Topic$/i, "").trim()),
    published: formatDate(song.published),
  }));
};
