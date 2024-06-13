import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import FormEditProfil from "../../../../components/Forms/FormEditProfil.js";
// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function EditSSR() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditProfil />
        </div>
      </div>
    </>
  );
}

EditSSR.layout = Admin;
