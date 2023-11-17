"use client";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import classes from "./LoginForm.module.css";

interface FormInputs {
  identifier: string;
  pass: string;
}

export default function LoginForm() {
  const { getInputProps, onSubmit } = useForm<FormInputs>({
    initialValues: {
      identifier: "",
      pass: "",
    },
    validate: {
      identifier: (value) =>
        value.length < 4
          ? "Your email and username both have more than 3 characters"
          : null,
      pass: (value) =>
        value.length < 6
          ? "The password can't be less than 6 characters"
          : null,
    },
  });
  const router = useRouter();

  async function doLogin({ identifier, pass }: FormInputs) {
    await signIn("credentials", {
      identifier,
      pass,
      redirect: false,
    }).then((res) => {
      if (res && res.error) {
        notifications.show({
          color: "red",
          message: "Identifier or password incorrect",
        });
      } else if (res && !res.error) {
        router.replace("/descriptors");
      }
    });
  }

  return (
    <Box
      component="form"
      className={classes.container}
      onSubmit={onSubmit(doLogin)}
    >
      <TextInput
        label="Username or Email"
        withAsterisk
        {...getInputProps("identifier")}
      />
      <TextInput label="Password" withAsterisk {...getInputProps("pass")} />

      <Button type="submit">Login</Button>
    </Box>
  );
}
