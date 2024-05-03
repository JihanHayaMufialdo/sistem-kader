import React from "react";

// components
import CardLihatKTA from "../../../components/Cards/CardLihatKTA.js";
// layout for page
import Admin from "../../../layouts/Admin.js";

export default function LihatKTA() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardLihatKTA />
        </div>
      </div>
    </>
  );
}

CardLihatKTA.layout = Admin;
