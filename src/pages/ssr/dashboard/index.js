// src/pages/admin/ssr/dashboard/index.js

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth";

// components
import CardLineChart from "../../../components/Cards/CardLineChart";
import CardPieChart from "../../../components/Cards/CardPieChart";
import CardRankWilayah from "../../../components/Cards/CardRankWilayah";
// layout for page
import SSR from "../../../layouts/SSR";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'SSR') {
        router.push('/unauthorized'); // Redirect ke halaman unauthorized jika bukan SSR
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Atau tampilkan spinner loading
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
      </div>
    </>
  );
};

Dashboard.layout = SSR;

export default Dashboard;
