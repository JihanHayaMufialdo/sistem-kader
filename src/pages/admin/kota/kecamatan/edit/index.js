// src/pages/admin/edit-kecamatan/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import FormEditKecamatan from "../../../../../components/Forms/FormEditKecamatan";
// layout for page
import Admin from "../../../../../layouts/Admin";

const EditKecamatan = () => {
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
          <FormEditKecamatan />
        </div>
      </div>
    </>
  );
};

EditKecamatan.layout = Admin;

export default EditKecamatan;
