import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getSongSelections } from "../utils/selectorAPI";
import { authenticateUser } from "../middleware/authenticate";
import {
  addLike,
  readLikedSongs,
  readTopSongs,
  readLatestSongs,
} from "../../prisma/src/songs";
import { error } from "console";

if (!process.env.FRONTEND_URL) {
  throw error("unkown origin");
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
  "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  try {
    const songMode = event.queryStringParameters?.songMode;

    const user = await authenticateUser(event);
    const newSongs = await getSongSelections(
      songMode,
      user?.email ? user.email : undefined
    );
    return {
      statusCode: 200,
      headers: CORS_HEADERS,

      body: JSON.stringify(newSongs),
    };
  } catch (e) {
    console.error("Error fetching songs:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error." }),
    };
  }
};

export const likeSong = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const user = await authenticateUser(event);
    if (!user?.email) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "Unauthorized: No token provided." }),
      };
    }

    if (!event.pathParameters?.songId) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "No songID provided." }),
      };
    }

    const result = await addLike(user.email, event.pathParameters.songId);
    console.log("like result", result);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,

      body: JSON.stringify({ message: "song has been liked :)" }),
    };
  } catch (e) {
    console.error("Error fetching songs:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error." }),
    };
  }
};

export const fetchLikedSongs = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const user = await authenticateUser(event);
    if (!user?.email) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "Unauthorized: No token provided." }),
      };
    }
    const likedSongs = await readLikedSongs(user.email);
    console.log(likedSongs);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,

      body: JSON.stringify({ likedSongs: likedSongs }),
    };
  } catch (e) {
    console.error("Error fetching songs:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error." }),
    };
  }
};

export const fetchTopSongs = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const topSongs = await readTopSongs();
    console.log(topSongs);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,

      body: JSON.stringify({ topSongs: topSongs }),
    };
  } catch (e) {
    console.error("Error fetching songs:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error." }),
    };
  }
};

export const fetchLatestSongs = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const latestSongs = await readLatestSongs();
    console.log(latestSongs);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,

      body: JSON.stringify({ latestSongs: latestSongs }),
    };
  } catch (e) {
    console.error("Error fetching songs:", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error." }),
    };
  }
};
