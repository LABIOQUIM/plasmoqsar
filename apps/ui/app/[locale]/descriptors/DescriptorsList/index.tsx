"use client";
import { useEffect } from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";

import { useQSARDescriptorsQuery } from "../useQSARDescriptors";

import { DescriptorItem } from "./DescriptorItem";

import classes from "./DescriptorsList.module.css";

export default function DescriptorsList() {
  const { data, refetch, isLoading, isRefetching } = useQSARDescriptorsQuery();
  const [debouncedIsRefetching] = useDebouncedValue(isRefetching, 500, {
    leading: true,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return null;
  }

  if (data === "no-session") {
    return null;
  }

  return (
    <Box className={classes.container}>
      <LoadingOverlay
        visible={isLoading || debouncedIsRefetching}
        zIndex={1000}
        overlayProps={{ backgroundOpacity: 0.25, radius: "sm", blur: 2 }}
        loaderProps={{ type: "dots" }}
      />

      {data.flatMap((d) => (
        <DescriptorItem key={d.id} descriptor={d} />
      ))}
    </Box>
  );
}
