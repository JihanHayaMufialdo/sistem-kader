import React from "react";

// components

import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardBarChart from "../../../components/Cards/CardBarChart.js";
import CardPageVisits from "../../../components/Cards/CardPageVisits.js";
//import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "../../../layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap flex-wrap mt-4">
        <div className="w-full px-4">
          <CardLineChart />
      </div>
       <div className="w-full px-4">
          <CardBarChart />
      </div>
        <div className="w-full px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
