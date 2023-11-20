"use client";
import { ReactElement } from "react";
import { Badge, Group, Text, UnstyledButton } from "@mantine/core";
import { Icon, IconCell, IconLogout } from "@tabler/icons-react";
import Link from "next/link";

import { SignInButton } from "@/components/SignInButton";
import { invalidateSession } from "@/hooks/invalidateSession";

import { RegisterButton } from "../RegisterButton";

import classes from "./Navbar.module.css";

interface MainLink {
  icon: Icon;
  label: string;
  href: string;
  notifications?: number;
}

const links: MainLink[] = [
  { icon: IconCell, label: "Descriptors", href: "/descriptors" },
];

interface Props {
  toggle(): void;
  session: any;
}

export function Navbar({ toggle, session }: Props): ReactElement {
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
        <SignInButton session={session} />
      </div>

      {session ? (
        <div className={classes.section}>
          <div className={classes.mainLinks}>
            {...mainLinks}
            <UnstyledButton
              className={classes.mainLink}
              onClick={() => invalidateSession()}
            >
              <Group className={classes.sectionLogout} gap="md">
                <IconLogout />
                <Text>Logout</Text>
              </Group>
            </UnstyledButton>
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
