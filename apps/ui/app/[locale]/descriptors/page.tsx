import { Group, Title } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageLayout } from "@/components/PageLayout";
import { authOptions } from "@/lib/auth";
import { queryClient } from "@/lib/queryClient";

import { getQSARDescriptors } from "./getQSARDescriptors";

const QSARFormModal = dynamic(() => import("./QSARFormModal"), {
  ssr: false,
});

const DescriptorsList = dynamic(() => import("./DescriptorsList"), {
  ssr: false,
});

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await queryClient.prefetchQuery({
    queryKey: ["user-descriptors"],
    queryFn: () => getQSARDescriptors(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout>
        <Group gap="lg">
          <Title>My Molecules</Title>
          <QSARFormModal />
        </Group>
        <DescriptorsList />
      </PageLayout>
    </HydrationBoundary>
  );
}
