import { PropsWithChildren } from "react";

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
      <body>{children}</body>
    </html>
  );
}
