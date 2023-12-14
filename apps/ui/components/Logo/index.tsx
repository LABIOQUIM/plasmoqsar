import { ReactElement } from "react";
import { Box, Title } from "@mantine/core";
import { IconChartDots } from "@tabler/icons-react";
import Link from "next/link";

import classes from "./Logo.module.css";

export function Logo(): ReactElement {
  return (
    <Box component={Link} href="/" className={classes.container}>
      <IconChartDots />
      <Title className={classes.title}>PlasmoQSAR</Title>
    </Box>
  );
}
