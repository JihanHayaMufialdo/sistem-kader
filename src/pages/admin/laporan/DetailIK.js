import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import TableDetailIK from "../../../components/Cards/CardDetailIK.js";

// layout for page

import Admin from "../../../layouts/Admin.js";


export default function Laporan() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableDetailIK />
        </div>
      </div>
    </>
  );
}

Laporan.layout = Admin;