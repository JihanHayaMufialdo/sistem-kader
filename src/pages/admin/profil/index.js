// src/pages/admin/profil/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth"; // Pastikan jalur impor benar
// components
import CardProfile from "../../../components/Cards/CardProfile.js"; // Sesuaikan jalur sesuai struktur direktori
// layouts
import Admin from "../../../layouts/Admin.js"; // Sesuaikan jalur sesuai struktur direktori

const Profil = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'Admin') {
        router.push('/unauthorized'); // Redirect ke halaman unauthorized jika bukan Admin
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
          <CardProfile />
        </div>
      </div>
    </>
  );
};

Profil.layout = Admin;

export default Profil;
