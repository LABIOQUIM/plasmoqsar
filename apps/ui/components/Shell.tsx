"use client";

import { PropsWithChildren } from "react";
import { AppShell, Box, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

import { LoadingBox } from "@/components/LoadingBox";
import { Logo } from "@/components/Logo";
import { queryClient } from "@/lib/queryClient";

const Navbar = dynamic(
  () => import("@/components/Navbar").then((mod) => mod.Navbar),
  {
    loading: LoadingBox,
    ssr: false,
  }
);

const ThemeToggle = dynamic(
  () =>
    import("@/components/ThemeToggle").then(
      (mod) => mod.ThemeToggle
    ),
  {
    ssr: false,
  }
);

export function Shell({ children }: PropsWithChildren) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group justify="space-between" h="100%" w="100%" px="md">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Logo />
            </Group>
            <Group>
              <Box visibleFrom="sm">
                <ThemeToggle />
              </Box>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar px="md">
          <Navbar toggle={toggle} />
        </AppShell.Navbar>
        <AppShell.Main
          styles={{
            main: {
              display: "flex",
              flexDirection: "column",
              flex: 1,
            },
          }}
        >
          {children}
        </AppShell.Main>
      </AppShell>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}