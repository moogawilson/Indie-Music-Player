import prisma from "./prismaClient";

export const rateSong = async (
  userId: number,
  songID: string,
  rating: number
) => {
  console.log("rating");
  try {
    const result = await prisma.rating.create({
      data: { userId: userId, songId: songID, rating: rating },
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export const addLike = async (email: string, songID: string) => {
  try {
    const existingLike = await prisma.song.findFirst({
      where: {
        id: songID,
        likes: {
          some: {
            email: email,
          },
        },
      },
    });

    if (existingLike) {
      throw new Error("User has already liked this song.");
    }

    await prisma.song.update({
      where: { id: songID },
      data: {
        numberofLikes: { increment: 1 },
        likes: {
          connect: { email: email },
        },
      },
    });
  } catch (e) {
    throw new Error("Song like failed");
  }
};

export const writeSongs = async (
  songId: string,
  title: string,
  published: string,
  artistId: string
) => {
  try {
    const result = await prisma.song.upsert({
      where: { id: songId },
      update: {},
      create: {
        id: songId,
        listens: 0,
        title: title,
        published: published,
        artistId: artistId,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const readSongs = async () => {
  try {
    const result = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const checkIfCatalogued = async (id: string) => {
  try {
    const result = await prisma.song.findUnique({ where: { id: id } });

    if (result === null) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const readLikedSongs = async (email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email: email },
      select: {
        likedSongs: {
          select: {
            id: true,
            title: true,
            published: true,
            artist: {
              select: {
                channelTitle: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const readTopSongs = async () => {
  try {
    const result = await prisma.song.findMany({
      orderBy: {
        numberofLikes: "desc",
      },
      take: 25,
      select: {
        id: true,
        title: true,
        published: true,
        artist: {
          select: {
            channelTitle: true,
          },
        },
      },
    });
    return result.map(({ artist, ...song }) => ({
      ...song,
      artistName: artist?.channelTitle,
    }));
  } catch (err) {
    console.error(err);
  }
};

export const readLatestSongs = async () => {
  try {
    const result = await prisma.song.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 25,
      select: {
        id: true,
        title: true,
        published: true,
        artist: {
          select: {
            channelTitle: true,
          },
        },
      },
    });

    return result.map(({ artist, ...song }) => ({
      ...song,
      artistName: artist?.channelTitle,
    }));
  } catch (err) {
    console.error(err);
  }
};
