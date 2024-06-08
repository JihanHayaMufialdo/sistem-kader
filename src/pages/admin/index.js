// authMiddleware.js
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      router.push("/login");
    }
  }, [router]);

  return null;
};
