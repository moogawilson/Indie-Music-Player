import jwt, { JwtPayload } from "jsonwebtoken";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { decode } from "next-auth/jwt";
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || false;

export const authenticateUser = async (event: APIGatewayProxyEvent) => {
  try {
    const method = event.httpMethod;
    const sessionToken = getSessionToken(event);
    const email =
      method === "GET"
        ? event.queryStringParameters?.email
        : JSON.parse(event.body || "{}").email;

    if (sessionToken && NEXTAUTH_SECRET) {
      const decoded = (await decode({
        token: sessionToken,
        secret: NEXTAUTH_SECRET,
      })) as JwtPayload;

      if (decoded.email !== email) {
        throw new Error("Unauthorized");
      }
      return decoded;
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

const getSessionToken = (event: APIGatewayProxyEvent) => {
  const isSecure = event.headers["X-Forwarded-Proto"] === "https";
  const cookies = event.headers.Cookie;
  if (!cookies) return null;

  const cookieArray = cookies.split(";");
  const sessionCookie = cookieArray.find((cookie) =>
    cookie
      .trim()
      .startsWith(
        isSecure
          ? "__Secure-next-auth.session-token="
          : "next-auth.session-token="
      )
  );
  console.log(
    "the interesting bit it",
    isSecure ? "__Secure-next-auth.session-token=" : "next-auth.session-token="
  );
  if (!sessionCookie) return null;
  return sessionCookie.split("=")[1].trim();
};

export const authenticateJWT = async (token: string) => {
  try {
    console.log("secret", NEXTAUTH_SECRET);
    if (!NEXTAUTH_SECRET) {
      throw new Error("Internal Server Error: Missing NEXTAUTH_SECRET");
    }
    const decoded = jwt.verify(token, NEXTAUTH_SECRET) as {
      email: string;
      name: string;
    };
    console.log("decodied is", decoded);
    return decoded;
  } catch (error) {
    console.error("Error during JWT authentication:", error);
    throw error;
  }
};
