import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as client } from "database";
import { lucia } from "lucia";
import { nextjs_future as nextjsFuture } from "lucia/middleware";

export const auth = lucia({
  adapter: prisma(client),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjsFuture(),
  sessionCookie: {
    expires: false,
  },
  getUserAttributes: (data) => {
    return data;
  },
});
