import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageLayout } from "@/components/PageLayout";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <PageLayout>ALo</PageLayout>;
}
