// src/pages/admin/kota/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import TableProvinsi from "../../../components/Cards/CardTableProvinsi";
import TableKota from "../../../components/Cards/CardTableKota";
// layout for page
import Admin from "../../../layouts/Admin";

const Kota = () => {
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
          <TableProvinsi />
        </div>
        <div className="w-full mb-12 px-4">
          <TableKota />
        </div>
      </div>
    </>
  );
};

Kota.layout = Admin;

export default Kota;
