import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

import { Shell } from "@/components/Shell";
import { getSession } from "@/hooks/getSession";
import { theme } from "@/theme";

import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

// const ColorSchemeScript = dynamic(
//   () => import("@mantine/core").then((mod) => mod.ColorSchemeScript),
//   { ssr: false }
// );

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <html lang="en">
      <head>
        {/* <ColorSchemeScript /> */}
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
            <Shell session={session}>{children}</Shell>
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
