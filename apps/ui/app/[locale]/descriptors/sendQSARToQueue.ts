"use server";
import { getServerSession } from "next-auth";

import { api } from "@/lib/api";
import { authOptions } from "@/lib/auth";

export async function sendQSARToQueue(data: FormData) {
  const session = await getServerSession(authOptions);

  await api
    .post("/v1/descriptors", data, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.log(err));
}
