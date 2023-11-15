import { Box, SimpleGrid, Title } from "@mantine/core";
import dynamic from "next/dynamic";

import { PageLayout } from "@/components/PageLayout";

const QSARForm = dynamic(() => import("./QSARForm"), {
  ssr: false,
});

export default function Page() {
  return (
    <PageLayout>
      <Title>Calculate new Y</Title>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <QSARForm />
        <Box>{/* Maybe an image here */}</Box>
      </SimpleGrid>
    </PageLayout>
  );
}
