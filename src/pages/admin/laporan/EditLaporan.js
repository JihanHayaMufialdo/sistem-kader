import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import FormEditLaporan from "../../../components/Forms/FormEditLaporan.js";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function EditLaporan() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditLaporan />
        </div>
      </div>
    </>
  );
}

EditLaporan.layout = Admin;
