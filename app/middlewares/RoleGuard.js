"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RoleGuard({ allowedRoles = [], children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      router.replace("/auth/login");
      toast.error("Unauthorized");
      return;
    }

    if (!allowedRoles.includes(role)) {
      router.replace("/auth/login");
      toast.error("Unauthorized");
      return;
    }

    setAuthorized(true);
  }, [allowedRoles, router]);

  if (!authorized) return null;

  return <>{children}</>;
}
