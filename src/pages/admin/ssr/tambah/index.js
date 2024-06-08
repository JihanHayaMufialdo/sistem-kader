import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import FormInsertSSR from "../../../../components/Forms/FormInsertSSR.js";
// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function InsertSSR() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormInsertSSR />
        </div>
      </div>
    </>
  );
}

InsertSSR.layout = Admin;
