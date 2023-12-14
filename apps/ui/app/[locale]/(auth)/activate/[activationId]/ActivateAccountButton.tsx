"use client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useParams, useRouter } from "next/navigation";

import { activateUser } from "./activateUser";

export function ActivateAccountButton() {
  const { activationId } = useParams();
  const router = useRouter();

  const handleActivateAccount = () => {
    activateUser(activationId as string).then((res) => {
      if (res === "user-activated") {
        notifications.show({
          color: "green",
          message: "Account Activated",
        });

        router.push("/login");
      } else if (res === "account-already-activated") {
        notifications.show({
          color: "orange",
          message: "This account is already active.",
        });

        router.push("/login");
      } else if (res === "invalid-activation-code") {
        notifications.show({
          color: "red",
          message: "This activation URL is invalid.",
        });
      } else if (res === "unknown-error") {
        notifications.show({
          color: "red",
          message: "Something went wrong.",
        });
      }
    });
  };

  return <Button onClick={handleActivateAccount}>Activate Account</Button>;
}
