import React from "react";

// components
import FormTambahKecamatan from "../../../../../components/Forms/FormTambahKecamatan.js";

// layout for page
import Admin from "../../../../../layouts/Admin.js";

export default function TambahKecamatan() {
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
