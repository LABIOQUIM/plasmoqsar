import { PropsWithChildren } from "react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";

import { Shell } from "@/components/Shell";
import { getSession } from "@/hooks/getSession";
import { I18nProviderClient } from "@/locales/client";
import { theme } from "@/theme";

import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "@mantine/dropzone/styles.layer.css";
import "@mantine/notifications/styles.layer.css";

export const metadata: Metadata = {
  title: {
    default: "PlasmoQSAR",
    template: "%s | PlasmoQSAR",
  },
  description:
    "Calculation of pEC50 and EC50% of anti-malaria agents - QSAR with machine learning",
};

interface Props {
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<Props>) {
  const session = await getSession();

  return (
    <html lang={params.locale}>
      <body>
        <I18nProviderClient locale={params.locale}>
          <MantineProvider theme={theme}>
            <DatesProvider
              settings={{
                firstDayOfWeek: 0,
              }}
            >
              <Notifications position="top-right" />
              <Shell session={session}>{children}</Shell>
            </DatesProvider>
          </MantineProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
