// src/pages/admin/tambah-kota/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import FormTambahKota from "../../../../components/Forms/FormTambahKota";
// layout for page
import Admin from "../../../../layouts/Admin";

const TambahKota = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'Admin') {
        router.push('/unauthorized'); // Redirect ke halaman unauthorized jika bukan admin
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
          <FormTambahKota />
        </div>
      </div>
    </>
  );
};

TambahKota.layout = Admin;

export default TambahKota;
