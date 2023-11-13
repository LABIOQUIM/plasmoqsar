import { PropsWithChildren } from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

import { Shell } from "@/components/Shell";
import { theme } from "@/theme";

import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

export const metadata = {
  title: {
    default: "QSAR",
    template: "%s | QSAR",
  },
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <DatesProvider settings={{}}>
            <Notifications position="top-right" />
            <Shell>{children}</Shell>
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
