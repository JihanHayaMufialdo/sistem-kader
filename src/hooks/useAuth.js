// src/hooks/useAuth.js

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!authToken || !userData) {
      router.push('/login');
    } else {
      setUser(userData);
    }
    setLoading(false);
  }, [router]);

  return { user, loading };
};
