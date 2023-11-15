"use client";
import { ReactElement } from "react";
import {
  Badge,
  Code,
  Group,
  rem,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { Icon, IconBulb, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

import { SignInButton } from "@/components/SignInButton";

import classes from "./Navbar.module.css";

interface MainLink {
  icon: Icon;
  label: string;
  href: string;
  notifications?: number;
}

const links: MainLink[] = [
  { icon: IconBulb, label: "Projects", href: "/projects" },
  { icon: IconBulb, label: "Descriptors", href: "/descriptors" },
];

const collections = [
  { emoji: "👍", label: "Sales" },
  { emoji: "🚚", label: "Deliveries" },
  { emoji: "💸", label: "Discounts" },
  { emoji: "💰", label: "Profits" },
  { emoji: "✨", label: "Reports" },
  { emoji: "🛒", label: "Orders" },
  { emoji: "📅", label: "Events" },
  { emoji: "🙈", label: "Debts" },
  { emoji: "💁‍♀️", label: "Customers" },
];

interface Props {
  toggle(): void;
}

export function Navbar({ toggle }: Props): ReactElement {
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

  const collectionLinks = collections.map((collection) => (
    <UnstyledButton
      component={Link}
      onClick={toggle}
      href="#"
      key={collection.label}
      className={classes.collectionLink}
    >
      <div style={{ marginRight: rem(9), fontSize: rem(16), width: rem(24) }}>
        {collection.emoji}
      </div>
      {collection.label}
    </UnstyledButton>
  ));

  return (
    <>
      <div className={classes.section}>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </div>

      <TextInput
        placeholder="Search"
        size="md"
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: "none" } }}
        my="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{...mainLinks}</div>
      </div>

      <div className={classes.section}>
        <Group className={classes.collectionsHeader} justify="space-between">
          <Text size="md" fw={500} c="dimmed">
            Recent Projects
          </Text>
        </Group>
        <div className={classes.collections}>{...collectionLinks}</div>
      </div>
    </>
  );
}
