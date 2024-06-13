// src/pages/admin/dashboard/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth.js"; // Periksa jalur ini

// components
import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardPieChart from "../../../components/Cards/CardPieChart.js";
import CardRankKader from "../../../components/Cards/CardRankKader.js";
import CardRankWilayah from "../../../components/Cards/CardRankWilayah.js";

// layout for page
import Admin from "../../../layouts/Admin.js";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'Admin') {
        router.push('/unauthorized'); // redirect to unauthorized page or any other page
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // or you can return a loading spinner here
  }

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
