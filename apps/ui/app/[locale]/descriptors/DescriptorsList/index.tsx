"use client";
import { Box } from "@mantine/core";

import { useQSARDescriptorsQuery } from "../useQSARDescriptors";

import { DescriptorItem } from "./DescriptorItem";

import classes from "./DescriptorsList.module.css";

export default function DescriptorsList() {
  const { data } = useQSARDescriptorsQuery();

  if (!data) {
    return null;
  }

  if (data === "no-session") {
    return null;
  }

  return (
    <Box className={classes.container}>
      {data.flatMap((d) => (
        <DescriptorItem key={d.id} descriptor={d} />
      ))}
    </Box>
  );
}
