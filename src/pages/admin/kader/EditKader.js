import React from "react";

// components
import FormEditKader from "../../../components/Forms/FormEditKader";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function EditKader() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditKader />
        </div>
      </div>
    </>
  );
}

EditKader.layout = Admin;
