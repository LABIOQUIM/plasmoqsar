import { Box, SimpleGrid, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { PageLayout } from "@/components/PageLayout";
import { getSession } from "@/hooks/getSession";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

export default async function Page() {
  const session = await getSession();
  if (session) redirect("/descriptors");

  return (
    <PageLayout>
      <Title>Login</Title>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <LoginForm />
        <Box>{/* Maybe an image here */}</Box>
      </SimpleGrid>
    </PageLayout>
  );
}
