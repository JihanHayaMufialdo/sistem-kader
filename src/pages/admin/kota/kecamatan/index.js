import React from "react";
import { useAuth } from "../../../admin/index.js";

// components
import TableKecamatan from "../../../../components/Cards/CardTableKecamatan.js";

// layout for page
import Admin from "../../../../layouts/Admin.js";

export default function Kecamatan() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-3 px-4">
          <TableKecamatan />
        </div>
      </div>
    </>
  );
}

Kecamatan.layout = Admin;
