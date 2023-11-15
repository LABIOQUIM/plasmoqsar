import { PropsWithChildren } from "react";
import { Box, BoxProps } from "@mantine/core";

import classes from "./PageLayout.module.css";

export function PageLayout({
  children,
  className,
}: PropsWithChildren<BoxProps>) {
  return <Box className={`${classes.container} ${className}`}>{children}</Box>;
}
