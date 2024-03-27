import React from "react";

// components
import FormEditSSR from "../../../../components/Forms/FormEditSSR.js";
// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function EditSSR() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditSSR />
        </div>
      </div>
    </>
  );
}

EditSSR.layout = Admin;
