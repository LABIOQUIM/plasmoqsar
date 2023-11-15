"use client";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import classes from "./LoginForm.module.css";

interface FormInputs {
  identifier: string;
  pass: string;
}

export default function LoginForm() {
  const { getInputProps, onSubmit } = useForm<FormInputs>();
  const router = useRouter();

  async function doLogin({ identifier, pass }: FormInputs) {
    await signIn("credentials", {
      identifier,
      pass,
      redirect: false,
    }).then((res) => {
      if (res && res.error) {
        //
      } else if (res && !res.error) {
        router.replace("/dashboard");
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
