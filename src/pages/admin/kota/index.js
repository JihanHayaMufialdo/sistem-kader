import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import TableProvinsi from "../../../components/Cards/CardTableProvinsi";
import TableKota from "../../../components/Cards/CardTableKota.js";

// layout for page
import Admin from "../../../layouts/Admin.js";

export default function Kota() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-3 px-4">
          <TableProvinsi />
        </div>
        <div className="w-full mb-12 px-4">
          <TableKota />
        </div>
      </div>
    </>
  );
}

Kota.layout = Admin;
