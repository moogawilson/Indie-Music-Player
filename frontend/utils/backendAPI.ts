"use client";

import axios from "axios";
import createApiClient from "./apiClient";
import { formatSongs } from "./processText";

export interface Song {
  id: string;
  title: string;
  artistName: string;
  artistChannel: string;
  likes: number;
  listens: number;
  published: string;
  image: string;
}

export async function rateSong(user: string, songID: string, rating: string) {
  try {
    const { client, session } = await createApiClient();
    await client.put("rate", {
      user,
      songID,
      rating,
    });
  } catch (error) {
    console.error("Error rating song:", error);
  }
}

export async function fetchSongList(
  userToken: string,
  songMode: string
): Promise<Song[]> {
  try {
    const { client, session } = await createApiClient();
    const email = session?.user.email;

    const response = await client.get("songlist", {
      params: { songMode, ...(email && { email }) },
    });

    return formatSongs(response.data);
  } catch (error) {
    console.error("Error fetching song list:", error);
    return [];
  }
}

export async function fetchLikedSongs(): Promise<Song[]> {
  try {
    const { client, session } = await createApiClient();
    const email = session?.user.email;

    const response = await client.get("liked-songs", {
      params: { ...(email && { email }) },
    });
    console.log("jkhfd", response.data.likedSongs.likedSongs);
    return response.data.likedSongs.likedSongs;
  } catch (error) {
    console.error("Error fetching song list:", error);
    return [];
  }
}

export async function fetchTopSongs(): Promise<Song[]> {
  try {
    const { client } = await createApiClient();

    const response = await client.get("top-songs");

    console.log("jkhfd", response.data.topSongs);
    return formatSongs(response.data.topSongs);
  } catch (error) {
    console.error("Error fetching song list:", error);
    return [];
  }
}

export async function fetchLatestSongs(): Promise<Song[]> {
  try {
    const { client } = await createApiClient();

    const response = await client.get("latest-songs");

    console.log("jkhfd", response.data.latestSongs);
    return formatSongs(response.data.latestSongs);
  } catch (error) {
    console.error("Error fetching song list:", error);
    return [];
  }
}

export async function likeSong(songID: string): Promise<Song[]> {
  try {
    const { client, session } = await createApiClient();
    const email = session?.user.email;

    const response = await client.post(`song/${songID}/like`, { email });

    return response.data;
  } catch (error) {
    console.error("Error fetching song list:", error);
    return [];
  }
}
