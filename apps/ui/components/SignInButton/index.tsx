import { HTMLAttributes, ReactElement } from "react";
import { Avatar, Group, rem, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

import classes from "./SignInButton.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function SignInButton(props: Props): ReactElement {
  return (
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
  );
}
