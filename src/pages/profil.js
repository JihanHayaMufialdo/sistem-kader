import React from 'react';
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import FormProfil from "../components/Forms/FormProfilAdmin.js";
import Admin from "../layouts/Admin.js";

export default function Profil() {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormProfil />
        </div>
      </div>
    </>
  );
}

Profil.layout = Admin;
