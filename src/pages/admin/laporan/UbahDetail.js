import React from "react";

// components
import FormUbahDetail from "../../../components/Forms/FormUbahDetail.js";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function UbahDetailLaporan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormUbahDetail />
        </div>
      </div>
    </>
  );
}

UbahDetailLaporan.layout = Admin;
