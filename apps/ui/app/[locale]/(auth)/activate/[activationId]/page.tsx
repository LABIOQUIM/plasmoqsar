import { Text, Title } from "@mantine/core";

import { PageLayout } from "@/components/PageLayout";

import { ActivateAccountButton } from "./ActivateAccountButton";

export default function Page() {
  return (
    <PageLayout>
      <Title>User Activation</Title>

      <Text>Click below to activate your account.</Text>

      <ActivateAccountButton />
    </PageLayout>
  );
}
