"use server";
import { getSession } from "@/hooks/getSession";
import { api } from "@/lib/api";

export async function sendQSARToQueue(data: FormData) {
  const session = await getSession();

  await api
    .post("/v1/descriptors", data, {
      headers: {
        "x-username": session.user.username,
      },
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.log(err));
}
