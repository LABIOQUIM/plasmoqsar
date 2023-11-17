"use server";

import { api } from "@/lib/api";

export async function registerUser(data: RegisterFormInputs) {
  await api.post("/v1/users", data);

  return "success";
}
