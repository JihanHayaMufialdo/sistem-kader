import React from "react";
import { useAuth } from "../../admin/index.js";

// components
import TableSSR from "../../../components/Cards/CardTablessr.js";

// layout for page
import Admin from "../../../layouts/Admin.js";

export default function SSR() {
  useAuth();
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableSSR />
        </div>
      </div>
    </>
  );
}

SSR.layout = Admin;
