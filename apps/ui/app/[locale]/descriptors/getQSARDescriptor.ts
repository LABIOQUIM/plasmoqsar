"use server";
import { api } from "@/lib/api";

export async function getQSARDescriptor(id: string) {
  const descriptor = await api.get<Descriptor>(`/v1/descriptors/${id}`);

  return descriptor.data;
}
