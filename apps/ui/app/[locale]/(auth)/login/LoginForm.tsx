"use client";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import { signIn } from "./signIn";

import classes from "./LoginForm.module.css";

interface FormInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { getInputProps, onSubmit } = useForm<FormInputs>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.length < 4
          ? "Your email and username both have more than 3 characters"
          : null,
      password: (value) =>
        value.length < 6
          ? "The password can't be less than 6 characters"
          : null,
    },
  });
  const router = useRouter();

  async function doLogin({ username, password }: FormInputs) {
    signIn(username, password).then((res) => {
      if (res === "invalid-credentials") {
        notifications.show({
          color: "red",
          message: "Username or Password incorrect",
        });
      } else if (res === "awaiting-activation") {
        notifications.show({
          color: "orange",
          message:
            "This user is awaiting activation. Check your email inbox and spam.",
        });
      } else if (res === "inactive") {
        notifications.show({
          color: "red",
          message: "This user has been disabled.",
        });
      } else if (res === "unknown-error") {
        notifications.show({
          color: "red",
          message: "Something went wrong. Please report to the administrators.",
        });
      } else {
        router.push("/descriptors");
      }
    });
  }

  return (
    <Box
      component="form"
      className={classes.container}
      onSubmit={onSubmit(doLogin)}
    >
      <TextInput label="Username" withAsterisk {...getInputProps("username")} />
      <TextInput
        label="Password"
        withAsterisk
        type="password"
        {...getInputProps("password")}
      />

      <Button type="submit">Login</Button>
    </Box>
  );
}
