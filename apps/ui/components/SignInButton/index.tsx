import { HTMLAttributes, ReactElement } from "react";
import { Avatar, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./SignInButton.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  session: any;
}

export function SignInButton({ session, ...props }: Props): ReactElement {
  if (session) {
    const userFullName = `${session.user.firstName} ${session.user.lastName}`;

    return (
      // <Link href="/account" className={classes.container}>
      <UnstyledButton className={classes.user} {...props}>
        <Group>
          <Avatar radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {userFullName.trim()}
            </Text>

            <Text c="dimmed" size="xs">
              {session.user.email}
            </Text>
          </div>

          {/* <IconChevronRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          /> */}
        </Group>
      </UnstyledButton>
      // </Link>
    );
  }

  return (
    <Link href="/login" className={classes.container}>
      <UnstyledButton className={classes.signin} {...props}>
        <Group>
          <Avatar radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Login
            </Text>

            <Text c="dimmed" size="xs">
              You must be registered and logged in to use the system.
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
