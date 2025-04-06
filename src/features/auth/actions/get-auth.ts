"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "@/lib/lucia";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get(lucia.sessionCookieName);

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(session.value);

  try {
    if (result.session && result.session.fresh) {
      const cookieSession = lucia.createSessionCookie(result.session.id);
      cookieStore.set(
        cookieSession.name,
        cookieSession.value,
        cookieSession.attributes,
      );
    }

    if (!result.session) {
      const cookieSession = lucia.createBlankSessionCookie();
      cookieStore.set(
        cookieSession.name,
        cookieSession.value,
        cookieSession.attributes,
      );
    }
  } catch {
    // do nothing if used in RSC
  }

  return result;
});
