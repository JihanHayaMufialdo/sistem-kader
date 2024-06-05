import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import TableDK from "../../../components/Cards/CardTableDK.js";


// layout for page

import Admin from "../../../layouts/Admin.js";

export default function TableeDK() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableDK />
        </div>

      </div>
    </>
  );
}

TableeDK.layout = Admin;
