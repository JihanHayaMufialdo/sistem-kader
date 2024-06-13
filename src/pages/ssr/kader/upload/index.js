import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import FormUploadKTA from "../../../../components/Forms/FormUploadKTA"; // Sesuaikan jalur sesuai struktur direktori
// layouts
import SSR from "../../../../layouts/SSR"; // Sesuaikan jalur sesuai struktur direktori

const UploadKTA = () => {
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
};

UploadKTA.layout = SSR;

export default UploadKTA;
