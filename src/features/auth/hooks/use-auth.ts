import { User as AuthUser } from "lucia/dist/core";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "@/features/auth/actions/get-auth";

export function useAuth() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    };

    fetchUser();
  }, [pathname]);

  return { user, isFetched };
}
