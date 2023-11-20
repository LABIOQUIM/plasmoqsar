"use server";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/lucia";

export async function invalidateSession() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  await auth.invalidateSession(session.sessionId);
  authRequest.setSession(null);

  redirect("/login?reason=logout");
}
