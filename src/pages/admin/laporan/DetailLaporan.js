import React from "react";

// components
import FormDetailLaporan from "../../../components/Forms/DetailLaporan/FormDetailLaporan.js";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function DetailLaporan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormDetailLaporan />
        </div>
      </div>
    </>
  );
}

DetailLaporan.layout = Admin;
