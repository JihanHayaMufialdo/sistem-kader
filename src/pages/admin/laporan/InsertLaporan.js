import React from "react";

// components
import FormInsertLaporan from "../../../components/Forms/FormInsertLaporan.js";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function TambahLaporan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormInsertLaporan />
        </div>
      </div>
    </>
  );
}

TambahLaporan.layout = Admin;
