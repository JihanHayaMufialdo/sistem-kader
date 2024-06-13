import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import CardKTA from "/src/components/Cards/CardKTA.js";

// layout for page
import SSR from "../../../../layouts/SSR";

function Kader() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardKTA />
        </div>
      </div>
    </>
  );
}

Kader.layout = SSR;

export default Kader;
