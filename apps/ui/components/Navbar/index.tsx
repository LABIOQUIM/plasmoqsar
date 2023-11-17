"use client";
import { ReactElement } from "react";
import { Badge, Group, Text, UnstyledButton } from "@mantine/core";
import { Icon, IconBulb, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { SignInButton } from "@/components/SignInButton";

import { RegisterButton } from "../RegisterButton";

import classes from "./Navbar.module.css";

interface MainLink {
  icon: Icon;
  label: string;
  href: string;
  notifications?: number;
}

const links: MainLink[] = [
  { icon: IconBulb, label: "Descriptors", href: "/descriptors" },
];

interface Props {
  toggle(): void;
}

export function Navbar({ toggle }: Props): ReactElement {
  const { status } = useSession();

  const mainLinks = links.map((link) => (
    <UnstyledButton
      component={Link}
      href={link.href}
      key={link.label}
      onClick={toggle}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return (
    <>
      <div className={classes.section}>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </div>

      {status === "authenticated" ? (
        <div className={classes.section}>
          <div className={classes.mainLinks}>
            {...mainLinks}
            {status === "authenticated" && (
              <UnstyledButton
                className={classes.mainLink}
                onClick={() => signOut()}
              >
                <Group className={classes.sectionLogout} gap="md">
                  <IconLogout />
                  <Text>Logout</Text>
                </Group>
              </UnstyledButton>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.section}>
          <RegisterButton />
        </div>
      )}
    </>
  );
}
