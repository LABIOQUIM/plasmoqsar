import { Group, Title } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";
import { queryClient } from "@/lib/queryClient";

import { getQSARMolecules } from "./getQSARMolecules";
import TimeToRefetch from "./TimeToRefetch";

const QSARFormModal = dynamic(() => import("./QSARFormModal"), {
  ssr: false,
});

const MoleculeList = dynamic(() => import("./MoleculeList"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "My Molecules",
};

export default async function Page() {
  const session = await getSession();
  if (!session) redirect("/login?reason=unauthorized");

  await queryClient.prefetchQuery({
    queryKey: ["user-descriptors"],
    queryFn: () => getQSARMolecules(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout>
        <Group gap="lg">
          <Title>My Molecules</Title>
          <QSARFormModal />
          <TimeToRefetch />
        </Group>
        <MoleculeList />
      </PageLayout>
    </HydrationBoundary>
  );
}
