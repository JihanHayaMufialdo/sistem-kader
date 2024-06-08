import React from "react";
import { useAuth } from "../../../admin/index.js";
// components
import FormTambahKota from "../../../../components/Forms/FormTambahKota.js";
// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function TambahKota() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormTambahKota />
        </div>
      </div>
    </>
  );
}

TambahKota.layout = Admin;
