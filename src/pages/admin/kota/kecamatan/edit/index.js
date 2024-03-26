import React from "react";

// components
import FormEditKecamatan from "../../../../../components/Forms/FormEditKecamatan.js";

// layout for page
import Admin from "../../../../../layouts/Admin.js";

export default function EditKecamatan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditKecamatan />
        </div>
      </div>
    </>
  );
}

EditKecamatan.layout = Admin;
