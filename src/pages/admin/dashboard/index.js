import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../admin/index.js";

// components
import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardPieChart from "../../../components/Cards/CardPieChart.js";
import CardRankKader from "../../../components/Cards/CardRankKader.js";
import CardRankWilayah from "../../../components/Cards/CardRankWilayah.js";
//import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

// layout for page
import Admin from "../../../layouts/Admin.js";

const Dashboard = () => {
  useAuth();

  return (
    <>
      <div className="flex flex-wrap flex-wrap mt-4">
        <div className="w-full px-4">
          <CardLineChart />
        </div>
        <div className="w-full px-4">
          <CardPieChart />
        </div>
        <div className="w-full px-4">
          <CardRankWilayah />
        </div>
        <div className="w-full px-4">
          <CardRankKader />
        </div>
      </div>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
  