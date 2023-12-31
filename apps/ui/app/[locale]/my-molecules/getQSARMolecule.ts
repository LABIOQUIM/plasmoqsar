"use server";
import { Descriptor } from "database";

import { api } from "@/lib/api";

export async function getQSARMolecule(id: string) {
  const descriptor = await api.get<Descriptor>(`/v1/descriptors/${id}`);

  return descriptor.data;
}
