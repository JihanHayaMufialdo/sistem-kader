import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import CardTableKaderSSR from "../../../components/Cards/CardTableKaderSSR.js";

// layout for page
import SSR from "../../../layouts/SSR.js";

export default function Kader() {
  useAuth();
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
