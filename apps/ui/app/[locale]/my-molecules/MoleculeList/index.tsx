"use client";
import { Box, Title } from "@mantine/core";
import { IconLayoutList } from "@tabler/icons-react";

import { useQSARMoleculesQuery } from "../useQSARMolecules";

import { DescriptorItem } from "./Molecule";

import classes from "./MoleculeList.module.css";

export default function MoleculeList() {
  const { data } = useQSARMoleculesQuery();

  if (!data || (data && data.length === 0)) {
    return (
      <Box className={classes.containerEmpty}>
        <IconLayoutList size={64} />
        <Title order={3}>No SDF has been submitted yet.</Title>
      </Box>
    );
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
