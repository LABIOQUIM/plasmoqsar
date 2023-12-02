import { Group, Title } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";
import { queryClient } from "@/lib/queryClient";

import { getQSARDescriptors } from "./getQSARDescriptors";
import TimeToRefetch from "./TimeToRefetch";

const QSARFormModal = dynamic(() => import("./QSARFormModal"), {
  ssr: false,
});

const DescriptorsList = dynamic(() => import("./DescriptorsList"), {
  ssr: false,
});

export const metadata: Metadata = {
  title:
    "Calculation of pEC50 and EC50% of anti-malaria agents - QSAR with machine learning",
};

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/login?reason=unauthorized");

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
          <TimeToRefetch />
        </Group>
        <DescriptorsList />
      </PageLayout>
    </HydrationBoundary>
  );
}
