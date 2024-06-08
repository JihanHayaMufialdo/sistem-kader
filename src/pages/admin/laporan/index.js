import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import TableLaporan from "../../../components/Cards/CardTableLaporan.js";
import TableIK from "../../../components/Cards/CardTableIK.js";

// layout for page

import Admin from "../../../layouts/Admin.js";


export default function Laporan() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableIK />
        </div>
        <div className="w-full mb-12 px-4">
          <TableLaporan />
        </div>
      </div>
    </>
  );
}

Laporan.layout = Admin;