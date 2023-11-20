"use client";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useQSARDescriptorsQuery } from "../useQSARDescriptors";

import QSARForm from "./QSARForm";

import classes from "./QSARFormModal.module.css";

export default function QSARFormModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, refetch } = useQSARDescriptorsQuery();

  let isDisabled = false;

  if (
    data &&
    data !== "no-session" &&
    data.some((d) => d.status === "AWAITING" || d.status === "RUNNING")
  ) {
    isDisabled = true;
  }

  return (
    <>
      <Modal
        keepMounted={false}
        centered
        classNames={{
          title: classes.title,
        }}
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        title="Calculate pEC50"
      >
        <QSARForm close={close} />
      </Modal>

      <Group>
        <Button
          disabled={isDisabled}
          onClick={open}
          title={
            isDisabled ? "You already have a calculation running/awaiting" : ""
          }
        >
          Submit new SDF
        </Button>
        <Button onClick={() => refetch()}>Reload List</Button>
      </Group>
    </>
  );
}
