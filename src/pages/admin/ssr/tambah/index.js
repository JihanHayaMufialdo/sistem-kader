// src/pages/admin/ssr/insert/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import FormInsertSSR from "../../../../components/Forms/FormInsertSSR";
// layout for page
import Admin from "../../../../layouts/Admin";

const InsertSSR = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'Admin') {
        router.push('/unauthorized'); // Redirect ke halaman unauthorized jika bukan SSR
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Atau tampilkan spinner loading
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormInsertSSR />
        </div>
      </div>
    </>
  );
};

InsertSSR.layout = Admin;

export default InsertSSR;
