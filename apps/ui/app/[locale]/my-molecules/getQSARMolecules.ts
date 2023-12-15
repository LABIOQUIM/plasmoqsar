"use server";

import { Descriptor } from "database";

import { getSession } from "@/hooks/getSession";
import { api } from "@/lib/api";

export async function getQSARMolecules() {
  const session = await getSession();

  if (!session) {
    return "no-session";
  }

  const descriptors = await api.get<Descriptor[]>(`/v1/descriptors`, {
    headers: {
      "x-username": session.user.username,
    },
  });

  return descriptors.data;
}
