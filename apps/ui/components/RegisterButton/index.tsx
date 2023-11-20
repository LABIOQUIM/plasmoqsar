import { HTMLAttributes, ReactElement } from "react";
import { Avatar, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight, IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./RegisterButton.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function RegisterButton(props: Props): ReactElement {
  return (
    <Link href="/register" className={classes.container}>
      <UnstyledButton className={classes.user} {...props}>
        <Group>
          <Avatar radius="xl">
            <IconUserPlus />
          </Avatar>

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              Register
            </Text>

            <Text c="dimmed" size="xs">
              Create a new account to access the system
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
