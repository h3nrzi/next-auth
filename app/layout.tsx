import "./globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
