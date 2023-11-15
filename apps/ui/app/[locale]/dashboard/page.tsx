import { getServerSession } from "next-auth";

import { PageLayout } from "@/components/PageLayout";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return <PageLayout>{JSON.stringify(session)}</PageLayout>;
}
