import React from "react";

// components
import FormEditKaderSSR from "../../../components/Forms/FormEditKaderSSR.js";

// layout for page
import SSR from "../../../../layouts/SSR.js";

export default function EditKader() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <FormEditKaderSSR />
        </div>
      </div>
    </>
  );
}

EditKader.layout = SSR;
