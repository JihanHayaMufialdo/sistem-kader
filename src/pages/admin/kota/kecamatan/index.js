// src/pages/admin/kecamatan/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import TableKecamatan from "../../../../components/Cards/CardTableKecamatan";
// layout for page
import Admin from "../../../../layouts/Admin";

const Kecamatan = () => {
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
        <div className="w-full mb-3 px-4">
          <TableKecamatan />
        </div>
      </div>
    </>
  );
};

Kecamatan.layout = Admin;

export default Kecamatan;
