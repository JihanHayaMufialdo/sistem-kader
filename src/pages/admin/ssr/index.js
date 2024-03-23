import React from "react";

// components

import CardSettings from "../../../components/Cards/CardSettings.js";
import CardTablessr from "../../../components/Cards/CardTablessr.js";

// layout for page

import Admin from "../../../layouts/Admin.js";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSettings />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTablessr />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;
