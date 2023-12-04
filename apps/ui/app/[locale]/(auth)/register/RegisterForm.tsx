"use client";
import { useState } from "react";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import { registerUser } from "./registerUser";

import classes from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { getInputProps, onSubmit } = useForm<RegisterFormInputs>({
    initialValues: {
      email: "",
      firstName: "",
      password: "",
      username: "",
      lastName: "",
    },
    validate: {
      email: (value) => (value.length < 8 ? "Invalid email" : null),
      firstName: (value) =>
        value.length < 2 ? "Please enter your first name" : null,
      lastName: (value) =>
        value.length < 2 ? "Please enter your last name" : null,
      password: (value) =>
        value.length < 6
          ? "Your password must have mor than 5 characters"
          : null,
      username: (value) =>
        value.length < 4
          ? "Your username must have more than 3 characters"
          : null,
    },
  });
  const router = useRouter();

  async function doRegister(data: RegisterFormInputs) {
    setIsLoading(true);
    registerUser(data)
      .then((res) => {
        if (res === "existing-user") {
          notifications.show({
            color: "red",
            message:
              "There's a user with this username or email already registered.",
          });
        } else if (res === "unknown-error") {
          notifications.show({
            color: "red",
            message:
              "Oops! Something went wrong. Please report it to the administrators.",
          });
        } else {
          notifications.show({
            color: "green",
            message: "Your account has been created.",
          });
          router.push("/descriptors");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Box
      component="form"
      className={classes.container}
      onSubmit={onSubmit(doRegister)}
    >
      <Group gap="sm" w="100%">
        <TextInput
          disabled={isLoading}
          label="First Name"
          placeholder="e.g.: John"
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps("firstName")}
        />
        <TextInput
          disabled={isLoading}
          label="Last Name"
          placeholder="e.g.: Doe"
          withAsterisk
          style={{ flex: 1 }}
          {...getInputProps("lastName")}
        />
      </Group>
      <TextInput
        disabled={isLoading}
        label="Username"
        placeholder="e.g.: johndoe"
        withAsterisk
        {...getInputProps("username")}
      />
      <TextInput
        disabled={isLoading}
        label="Email"
        placeholder="e.g.: john@doe.com"
        withAsterisk
        {...getInputProps("email")}
      />
      <TextInput
        disabled={isLoading}
        label="Password"
        placeholder="******"
        withAsterisk
        type="password"
        {...getInputProps("password")}
      />

      <Button loading={isLoading} type="submit">
        Register
      </Button>
    </Box>
  );
}
