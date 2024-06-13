// src/pages/admin/table-dk/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth"; // Periksa jalur ini

// components
import TableDK from "../../../components/Cards/CardTableDK.js";

// layout for page
import Admin from "../../../layouts/Admin.js";

const TableeDK = () => {
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
          <TableDK />
        </div>
      </div>
    </>
  );
};

TableeDK.layout = Admin;

export default TableeDK;
