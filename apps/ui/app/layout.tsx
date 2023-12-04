import { PropsWithChildren } from "react";
import PlausibleProvider from "next-plausible";

export const metadata = {
  title: {
    default: "PlasmoQSAR",
    template: "%s | PlasmoQSAR",
  },
  description:
    "Calculation of pEC50 and EC50% of anti-malaria agents - QSAR with machine learning",
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
