import React from "react";

// components
import CardTableKaderSSR from "../../../components/Cards/CardTableKaderSSR.js";

// layout for page
import SSR from "../../../layouts/SSR.js";

export default function Kader() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableKaderSSR />
        </div>
      </div>
    </>
  );
}

Kader.layout = SSR;
