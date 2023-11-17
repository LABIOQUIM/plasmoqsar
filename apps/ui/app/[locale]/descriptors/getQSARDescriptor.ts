"use server";
import { getServerSession } from "next-auth";

import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";

export async function getQSARDescriptor(id: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return "no-session";
  }

  const descriptor = await api.get<Descriptor>(`/v1/descriptors/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return descriptor.data;
}
