import React from "react";

// components

import CardTableLaporan from "../../../components/Cards/CardTableLaporan.js";

// layout for page

import Admin from "../../../layouts/Admin.js";

export default function Laporan() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTableLaporan />
        </div>
      </div>
    </>
  );
}

Laporan.layout = Admin;