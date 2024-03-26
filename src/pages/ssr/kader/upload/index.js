import React from "react";

// components
import FormUploadKTA from "../../../components/Forms/FormUploadKTA";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function InsertSSR() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormUploadKTA />
        </div>
      </div>
    </>
  );
}

InsertSSR.layout = Admin;
