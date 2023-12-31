import { memo, useEffect } from "react";
import { CSVLink } from "react-csv";
import {
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconClockPlus, IconClockUp } from "@tabler/icons-react";
import { Descriptor } from "database";

import { LoadingBox } from "@/components/LoadingBox";
import { dateFormat } from "@/utils/dateFormat";

import { useQSARMoleculeQuery } from "../useQSARMolecule";

import classes from "./Molecule.module.css";

interface Props {
  descriptor: Descriptor;
}

const StatusStyles = {
  SUCCESS: classes.success,
  AWAITING: classes.awaiting,
  ERRORED: classes.errored,
  RUNNING: classes.running,
};

function BaseDescriptorItem({ descriptor }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, refetch, isLoading, isRefetching } = useQSARMoleculeQuery(
    descriptor.id
  );

  useEffect(() => {
    if (opened) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  let rows: JSX.Element[] = [];
  const csvData: Array<Array<string>> = [
    ["Molecule", "D143", "D312", "D470", "pEC50", "IC50% (µM)"],
  ];

  if (data) {
    rows = data.results.map((element) => {
      const elements = element.split("\t");
      csvData.push(elements);

      return (
        <Table.Tr key={element}>
          {elements.map((el) => (
            <Table.Td key={element + el}>
              {Intl.NumberFormat("en-US", {
                maximumFractionDigits: 3,
              }).format(Number(el))}
            </Table.Td>
          ))}
        </Table.Tr>
      );
    });
  }

  return (
    <>
      <Modal
        keepMounted={false}
        centered
        classNames={{
          title: classes.title,
          body: classes.body,
        }}
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="xl"
        title={`pEC50 and IC50% (µM) on ${descriptor.sdfName.split("/")[1]}`}
      >
        <Group gap="sm">
          {isRefetching && (
            <Box mah={10} maw={40}>
              <LoadingBox />
            </Box>
          )}
        </Group>

        {data ? (
          <>
            <CSVLink
              data={csvData}
              filename={`EC50-and-IC50-on-${
                descriptor.sdfName.split("/")[1].split(".")[0]
              }.csv`}
            >
              <Button>Download CSV</Button>
            </CSVLink>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th ta="center">Molecule</Table.Th>
                  <Table.Th colSpan={3} ta="center">
                    Calculated Descriptors
                  </Table.Th>
                  <Table.Th ta="center">pEC50</Table.Th>
                  <Table.Th ta="center">IC50% (&micro;M)</Table.Th>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th ta="center">D143</Table.Th>
                  <Table.Th ta="center">D312</Table.Th>
                  <Table.Th ta="center">D470</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody ta="center">{rows}</Table.Tbody>
            </Table>
          </>
        ) : isLoading ? (
          <LoadingBox />
        ) : (
          <>
            <Title order={4}>This run hasn&apos;t ended yet.</Title>
            <Title order={5}>Wait some more, soon this will be filled.</Title>
          </>
        )}
      </Modal>

      <Paper
        className={`${classes.container} ${StatusStyles[descriptor.status]}`}
        onClick={open}
        withBorder
      >
        <Box className={classes.innerContainer}>
          <Title order={3}>{descriptor.sdfName.split("/")[1]}</Title>
          <Group>
            {descriptor.status === "ERRORED" && (
              <Text className={classes.errorText}>{descriptor.error}</Text>
            )}
          </Group>
          <Group gap="sm">
            <Group gap="xs" title="Submitted At">
              <IconClockPlus /> {dateFormat(descriptor.createdAt)}
            </Group>
            <Group gap="xs" title="Last Updated At">
              <IconClockUp /> {dateFormat(descriptor.updatedAt)}
            </Group>
          </Group>
        </Box>
        <Button
          classNames={{
            root: classes.resultsButton,
            label: classes.resultsButtonLabel,
          }}
        >
          Show results
        </Button>
      </Paper>
    </>
  );
}

type DescriptorKeys = keyof Descriptor;

export const DescriptorItem = memo(
  BaseDescriptorItem,
  (prevProps, nextProps) => {
    return Object.entries(nextProps.descriptor).every(
      ([key, value]) =>
        Object.prototype.hasOwnProperty.call(prevProps.descriptor, key) &&
        prevProps.descriptor[key as DescriptorKeys] === value
    );
  }
);
