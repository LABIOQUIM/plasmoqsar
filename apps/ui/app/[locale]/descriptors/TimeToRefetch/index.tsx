"use client";
import { useEffect, useState } from "react";
import { Loader, Text } from "@mantine/core";
import dayjs from "dayjs";

import { useQSARDescriptorsQuery } from "../useQSARDescriptors";

export default function TimeToRefetch() {
  const { dataUpdatedAt, isRefetching } = useQSARDescriptorsQuery();
  const [timeToRefetch, setTimeToRefetch] = useState(60);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newTimeToRefetch = dayjs(dataUpdatedAt)
        .add(60, "seconds")
        .diff(dayjs(new Date()), "seconds");

      setTimeToRefetch(newTimeToRefetch);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dataUpdatedAt, timeToRefetch]);

  if (timeToRefetch <= 0 || isRefetching) {
    return (
      <>
        <Text>Refetching...</Text>
        <Loader size="xs" type="dots" />
      </>
    );
  }

  if (timeToRefetch === 1) {
    return <Text>{timeToRefetch} second to refetch</Text>;
  }

  return <Text>{timeToRefetch} seconds to refetch</Text>;
}
