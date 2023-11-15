import { HTMLAttributes, ReactElement } from "react";
import { Avatar, Box, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { LoadingBox } from "../LoadingBox";

import classes from "./SignInButton.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function SignInButton(props: Props): ReactElement {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <Box className={classes.user}>
        <LoadingBox />
      </Box>
    );
  }

  if (status === "authenticated") {
    return (
      <Link href="/account" className={classes.container}>
        <UnstyledButton className={classes.user} {...props}>
          <Group>
            <Avatar radius="xl">
              {data.user.username.split(" ").map((w) => w[0].toUpperCase())}
            </Avatar>

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {data.user.username}
              </Text>

              <Text c="dimmed" size="xs">
                {data.user.email}
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Link>
    );
  }

  return (
    <Link href="/login" className={classes.container}>
      <UnstyledButton className={classes.user} {...props}>
        <Group>
          <Avatar radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Login
            </Text>

            <Text c="dimmed" size="xs">
              Thou must authenticate to use dis
            </Text>
          </div>

          <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        </Group>
      </UnstyledButton>
    </Link>
  );
}
