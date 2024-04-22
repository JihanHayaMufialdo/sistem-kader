import React from "react";

// components

import CardKTA from "../../../components/Cards/CardKTA.js";

// layout for page

import Admin from "../../../layouts/Admin.js";

export default function TableeDK() {
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

CardKTA.layout = Admin;
