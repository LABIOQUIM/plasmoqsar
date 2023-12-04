"use server";
import * as context from "next/headers";

import { auth } from "@/lib/lucia";

export async function registerUser(data: RegisterFormInputs) {
  try {
    const user = await auth.createUser({
      key: {
        providerId: "username", // auth method
        providerUserId: data.username.toLowerCase(), // unique id when using "username" auth method
        password: data.password, // hashed by Lucia
      },
      attributes: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest("POST", context);
    authRequest.setSession(session);
  } catch (e: any) {
    if (e && e.code && e.code === "P2002") {
      return "existing-user";
    }

    return "unknown-error";
  }
}
