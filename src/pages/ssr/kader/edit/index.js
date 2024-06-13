// src/pages/admin/ssr/edit-kader/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import FormEditKaderSSR from "../../../../components/Forms/FormEditKaderSSR";
// layout for page
import SSR from "../../../layouts/SSR";

const EditKader = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'SSR') {
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
          <FormEditKaderSSR />
        </div>
      </div>
    </>
  );
};

EditKader.layout = SSR;

export default EditKader;
