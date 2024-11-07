import { cookies } from "next/headers";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "@/lib/database/db";

const adapter = new BetterSqlite3Adapter(db, {
  user: "users",
  session: "sessions",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: { secure: process.env.NODE_ENV === "production" },
  },
});

export async function createAuthSession(userId: string) {
  // Create session
  const session = await lucia.createSession(userId, {});
  const cookie = lucia.createSessionCookie(session.id);

  // Set cookie
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}

export async function verifyAuthSession() {
  // If there isn't a cookie and value, return a null user
  const cookie = cookies().get(lucia.sessionCookieName);
  if (!cookie || !cookie.value) return { user: null, session: null };

  const result = await lucia.validateSession(cookie.value);

  try {
    // If there isn't a session, reset cookies
    if (!result.session) {
      const cookie = lucia.createBlankSessionCookie();
      cookies().set(cookie.name, cookie.value, cookie.attributes);
    }

    // If there is a session and fresh, reset cookies
    if (result.session && result.session.fresh) {
      const cookie = lucia.createSessionCookie(result.session.id);
      cookies().set(cookie.name, cookie.value, cookie.attributes);
    }
  } catch {}

  return result;
}

export async function destroyAuthSession() {
  const result = await verifyAuthSession();
  if (!result.session) return { errors: { server: "Unauthorized!" } };

  await lucia.invalidateSession(result.session.id);

  const cookie = lucia.createBlankSessionCookie();
  cookies().set(cookie.name, cookie.value, cookie.attributes);
}
