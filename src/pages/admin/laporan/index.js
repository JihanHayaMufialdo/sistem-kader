// src/pages/admin/laporan/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import TableLaporan from "../../../components/Cards/CardTableLaporan";
import TableIK from "../../../components/Cards/CardTableIK";
// layout for page
import Admin from "../../../layouts/Admin";

const Laporan = () => {
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
          <TableIK />
        </div>
        <div className="w-full mb-12 px-4">
          <TableLaporan />
        </div>
      </div>
    </>
  );
};

Laporan.layout = Admin;

export default Laporan;
