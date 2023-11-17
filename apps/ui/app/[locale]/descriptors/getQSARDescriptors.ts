"use server";
import { getServerSession } from "next-auth";

import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";

export async function getQSARDescriptors() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return "no-session";
  }

  const descriptors = await api.get<Descriptor[]>("/v1/descriptors", {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return descriptors.data;
}
