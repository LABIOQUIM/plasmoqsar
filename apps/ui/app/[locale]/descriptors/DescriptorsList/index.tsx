"use client";
import { useEffect } from "react";
import { Box, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { useQSARDescriptorsQuery } from "../useQSARDescriptors";

import { DescriptorItem } from "./DescriptorItem";

import classes from "./DescriptorsList.module.css";

export default function DescriptorsList() {
  const { status } = useSession();
  const { data, refetch, isLoading, isRefetching } = useQSARDescriptorsQuery();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      refetch();
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (!data) {
    return null;
  }

  if (data === "no-session") {
    return null;
  }

  return (
    <Box className={classes.container}>
      <LoadingOverlay
        visible={isLoading || isRefetching}
        zIndex={1000}
        overlayProps={{ backgroundOpacity: 0.25, radius: "sm", blur: 2 }}
      />

      {data.flatMap((d) => (
        <DescriptorItem key={d.id} descriptor={d} />
      ))}
    </Box>
  );
}
