import React, { useState, useEffect, useCallback } from "react";
import Chart from "chart.js";

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" }
];

export default function CardBarChart() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [year, setYear] = useState("");
  const [apiData, setApiData] = useState([]);
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "TPT",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: [],
        fill: false,
      },
      {
        label: "IKRT",
        backgroundColor: "#ff0000",
        borderColor: "#ff0000",
        data: [],
        fill: false,
      },
      {
        label: "IKNONRT",
        backgroundColor: "#00ff00",
        borderColor: "#00ff00",
        data: [],
        fill: false,
      },
      {
        label: "Laporan Ternotifikasi",
        backgroundColor: "#fbcb3a",
        borderColor: "#fbcb3a",
        data: [],
        fill: false,
      },
    ],
  });

  const mergeData = (rawData) => {
    const mergedData = {};

    rawData.forEach(item => {
      const tpt = parseInt(item.TPT, 10);
      const ik = parseInt(item.IK, 10);
      const ikNonrt = parseInt(item.IK_Nonrt, 10);
      const ternotifikasi = parseInt(item.Ternotifikasi, 10);

      if (!mergedData[item.Kabupaten_Kota]) {
        mergedData[item.Kabupaten_Kota] = {
          ...item,
          TPT: tpt,
          IK: ik,
          IK_Nonrt: ikNonrt,
          Ternotifikasi: ternotifikasi,
        };
      } else {
        mergedData[item.Kabupaten_Kota].TPT += tpt;
        mergedData[item.Kabupaten_Kota].IK += ik;
        mergedData[item.Kabupaten_Kota].IK_Nonrt += ikNonrt;
        mergedData[item.Kabupaten_Kota].Ternotifikasi += ternotifikasi;
      }
    });

    return Object.values(mergedData);
  };

  const updateChartData = useCallback((rawData, region, startMonth, endMonth, year) => {
    let filteredData = rawData;
    
    if (startMonth && endMonth && year) {
      const startDate = new Date(year, startMonth - 1);
      const endDate = new Date(year, endMonth - 1);

      filteredData = rawData.filter(item => {
        const itemDate = new Date(item.Tahun, item.Bulan - 1);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    if (region !== "All") {
      filteredData = filteredData.filter(item => item.Kabupaten_Kota === region);
    }

    filteredData = mergeData(filteredData);

    const labels = filteredData.map(item => item.Kabupaten_Kota);
    const tptData = filteredData.map(item => item.TPT);
    const ikrtData = filteredData.map(item => item.IK);
    const iknonrtData = filteredData.map(item => item.IK_Nonrt);
    const ternotifikasiData = filteredData.map(item => item.Ternotifikasi);

    setData({
      labels,
      datasets: [
        {
          label: "TPT",
          backgroundColor: "#4c51bf",
          borderColor: "#4c51bf",
          data: tptData,
          fill: false,
        },
        {
          label: "IKRT",
          backgroundColor: "#ff0000",
          borderColor: "#ff0000",
          data: ikrtData,
          fill: false,
        },
        {
          label: "IKNONRT",
          backgroundColor: "#00ff00",
          borderColor: "#00ff00",
          data: iknonrtData,
          fill: false,
        },
        {
          label: "Laporan Ternotifikasi",
          backgroundColor: "#fbcb3a",
          borderColor: "#fbcb3a",
          data: ternotifikasiData,
          fill: false,
        },
      ],
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/peringkat_perwilayah");
        const result = await response.json();
        setApiData(result);
        
        const uniqueCities = [...new Set(result.map(item => item.Kabupaten_Kota))];
        setUniqueRegions(uniqueCities);

        updateChartData(result, selectedRegion, startMonth, endMonth, year);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [updateChartData, selectedRegion, startMonth, endMonth, year]);

  useEffect(() => {
    const ctx = document.getElementById("bar-chart").getContext("2d");
    if (window.myBar) {
      window.myBar.destroy();
    }
    window.myBar = new Chart(ctx, {
      type: "bar",
      data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Wilayah",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Jumlah Laporan",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    });
  }, [data]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Pemeringkatan
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Laporan Perdaerah
              </h2>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1">
              <select
                className="form-select block w-full bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  updateChartData(apiData, e.target.value, startMonth, endMonth, year);
                }}
                value={selectedRegion}
              >
                <option value="All">All</option>
                {uniqueRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <select
              className="bg-indigo-100 text-black px-3 py-1 mr-2 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={startMonth}
              onChange={(e) => {
                setStartMonth(e.target.value);
                updateChartData(apiData, selectedRegion, e.target.value, endMonth, year);
              }}
            >
              <option value="">Start Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="bg-indigo-100 text-black px-3 py-1 mr-2 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={endMonth}
              onChange={(e) => {
                setEndMonth(e.target.value);
                updateChartData(apiData, selectedRegion, startMonth, e.target.value, year);
              }}
            >
              <option value="">End Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="bg-indigo-100 text-black px-3 py-1 bg-white border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                updateChartData(apiData, selectedRegion, startMonth, endMonth, e.target.value);
              }}
            >
              <option value="">Year</option>
              {[...new Set(apiData.map((item) => item.Tahun))].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
