import "./../globals.css";
import { PropsWithChildren } from "react";
import logout from "@/lib/actions/logout";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          <p>Welcome Back!</p>
          <form action={logout}>
            <button>Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
