"use client";
import { ReactElement } from "react";
import { Badge, Group, Text, UnstyledButton } from "@mantine/core";
import { Icon, IconCell, IconLogout } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

import EpiAmOBlackLogo from "@/assets/epiamo-black.png";
import EpiAmOWhiteLogo from "@/assets/epiamo-white.png";
import fiocruzROLogo from "@/assets/fiocruz-ro.png";
import labioquimLogo from "@/assets/labioquim.png";
import UFSBDarkLogo from "@/assets/UFSBDark.jpg";
import UFSBWhiteLogo from "@/assets/UFSBWhite.jpg";
import { SignInButton } from "@/components/SignInButton";
import { invalidateSession } from "@/hooks/invalidateSession";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";

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
  const isDark = useIsDarkTheme();

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
              className={classes.sectionLogout}
              color="red"
              onClick={() => invalidateSession()}
            >
              <Group gap="md">
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

      <div className={classes.makers}>
        <Image alt="" className={classes.makerImage128px} src={labioquimLogo} />
        <Image alt="" className={classes.makerImage96px} src={fiocruzROLogo} />
        <Image
          alt=""
          className={classes.makerImage96px}
          src={isDark ? EpiAmOWhiteLogo : EpiAmOBlackLogo}
        />
        <Image
          alt=""
          className={classes.makerImage128px}
          src={isDark ? UFSBDarkLogo : UFSBWhiteLogo}
        />
      </div>
    </>
  );
}
