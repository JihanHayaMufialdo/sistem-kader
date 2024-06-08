import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../components/Navbars/AdminNavbar.js";
import FormProfil from "../../../components/Forms/FormProfilAdmin.js";
import Admin from "../../../layouts/Admin.js";
import { useRouter } from "next/router";
import { useAuth } from "../../admin/index.js";

export default function Profil() {
  useAuth();
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
