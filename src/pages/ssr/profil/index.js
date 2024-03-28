import React from "react";

// components
import FormEditProfil from "../../../components/Forms/FormEditProfil.js";

// layout for page

import SSR from "../../../layouts/SSR.js";

export default function Profil() {
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

Profil.layout = SSR;
