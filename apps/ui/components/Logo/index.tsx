import { ReactElement } from "react";
import { Box, Title } from "@mantine/core";
import { IconMicroscope } from "@tabler/icons-react";
import Link from "next/link";

export function Logo(): ReactElement {
  return (
    <Box
      component={Link}
      href="/"
      style={(theme) => ({
        color: "unset",
        display: "flex",
        gap: theme.spacing.md,
        msTouchSelect: "none",
        msUserSelect: "none",
        textDecoration: "none",
        userSelect: "none",
      })}
    >
      <IconMicroscope />
      <Title
        styles={(theme) => ({
          root: {
            fontSize: theme.fontSizes.xl,
          },
        })}
      >
        QSAR
      </Title>
    </Box>
  );
}
