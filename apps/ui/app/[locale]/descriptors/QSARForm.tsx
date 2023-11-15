"use client";
import { useState } from "react";
import { Box, Button, rem, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconFileDescription, IconUpload, IconX } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

import { sendQSARToQueue } from "./sendQSARToQueue";

import classes from "./QSARForm.module.css";

interface QSARFormInputs {
  file: File;
}

export default function QSARForm() {
  const { onSubmit, setValues, values } = useForm<QSARFormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  function doSubmit({ file }: QSARFormInputs) {
    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    sendQSARToQueue(data).then(() => setIsLoading(false));
  }

  return (
    <Box
      component="form"
      className={classes.container}
      onSubmit={onSubmit(doSubmit)}
    >
      <Button onClick={() => signOut({ redirect: false })}>Sign Out</Button>
      <Dropzone
        loading={isLoading}
        classNames={{
          inner: classes.dropzone,
        }}
        onDrop={(files) => setValues({ file: files[0] })}
        onReject={(files) =>
          notifications.show({
            message: `Failed to upload the file(s): ${files
              .map((f) => f.file.name)
              .join(", ")}`,
          })
        }
        maxSize={3 * 1024 ** 2}
        accept={{
          "chemical/x-mdl-sdfile": [".sdf", ".SDF"],
        }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileDescription
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        {values.file ? (
          <div>
            <Text size="xl" inline>
              You have already uploaded the file <b>{values.file.name}</b>
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              You can drag or click and select another file to ovewrite the
              selected one
            </Text>
          </div>
        ) : (
          <div>
            <Text size="xl" inline>
              Drag a <b>.sdf</b> here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach one file at a time.
            </Text>
          </div>
        )}
      </Dropzone>

      <Button loading={isLoading} type="submit">
        Submit
      </Button>
    </Box>
  );
}
