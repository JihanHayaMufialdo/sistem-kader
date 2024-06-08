import React from "react";
import { useAuth } from "../../../../admin/index.js";
// components
import FormTambahKecamatan from "../../../../../components/Forms/FormTambahKecamatan.js";

// layout for page
import Admin from "../../../../../layouts/Admin.js";

export default function TambahKecamatan() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormTambahKecamatan />
        </div>
      </div>
    </>
  );
}

TambahKecamatan.layout = Admin;
