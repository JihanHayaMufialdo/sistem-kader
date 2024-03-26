import React from "react";

// components
import FormInsertKader from "../../../components/Forms/FormInsertKader";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function InsertKader() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormInsertKader />
        </div>
      </div>
    </>
  );
}

InsertKader.layout = Admin;
