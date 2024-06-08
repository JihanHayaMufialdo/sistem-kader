import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../admin/index.js";

// components
import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardBarChart from "../../../components/Cards/CardBarChart.js";
import CardRankWilayah from "../../../components/Cards/CardRankWilayah.js";
//import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

// layout for page
import SSR from "../../../layouts/SSR.js";

const Dashboard = () => {
  useAuth();

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
          <CardRankWilayah />
        </div>
      </div>
    </>
  );
};

Dashboard.layout = SSR;

export default Dashboard;
  