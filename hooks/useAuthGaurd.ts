"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard(allowedRoles: string[]) {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.replace("/");
        return;
      }

      const data = await res.json();
      if (!allowedRoles.includes(data.role)) {
        router.replace("/");
      }
    };

    check();
  }, [allowedRoles, router]);
}
