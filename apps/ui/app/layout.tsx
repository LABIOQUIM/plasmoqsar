import { PropsWithChildren } from "react";
import PlausibleProvider from "next-plausible";

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
        <PlausibleProvider
          customDomain={process.env.NEXT_PUBLIC_ANALYTICS_HOST}
          // @ts-expect-error
          domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
          selfHosted
          trackLocalhost
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
