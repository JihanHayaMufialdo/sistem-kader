import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import FormUploadKTA from "/src/components/Forms/FormUploadKTA.js";

export default function Kader() {
  useAuth();
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
