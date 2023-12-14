"use server";
import { prisma } from "database";
import { LuciaError } from "lucia";
import * as context from "next/headers";

import { auth } from "@/lib/lucia";

export async function signIn(username: string, password: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return "invalid-credentials";
    }

    if (user.status === "AWAITING_ACTIVATION") {
      return "awaiting-activation";
    }

    if (user.status === "INACTIVE") {
      return "inactive";
    }

    const key = await auth.useKey("username", username.toLowerCase(), password);
    const session = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);

    return "authenticated";
  } catch (e) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      return "invalid-credentials";
    }

    return "unknown-error";
  }
}
