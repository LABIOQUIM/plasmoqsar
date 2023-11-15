import { Box, SimpleGrid, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { PageLayout } from "@/components/PageLayout";
import { authOptions } from "@/lib/auth";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

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
