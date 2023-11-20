import { cache } from "react";
import * as context from "next/headers";

import { auth } from "@/lib/lucia";

export const getSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});
