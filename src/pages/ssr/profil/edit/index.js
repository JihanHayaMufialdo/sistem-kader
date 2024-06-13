// src/pages/admin/ssr/edit/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import FormEditProfil from "../../../../components/Forms/FormEditProfil.js"; // Sesuaikan jalur sesuai struktur direktori
// layouts
import SSR from "../../../../layouts/SSR.js"; // Sesuaikan jalur sesuai struktur direktori

const EditSSR = () => {
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
          <FormEditProfil />
        </div>
      </div>
    </>
  );
};

EditSSR.layout = SSR;

export default EditSSR;
