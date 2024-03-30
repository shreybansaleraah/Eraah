import React from "react";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ApexCharts from "react-apexcharts";
function DonationGraph() {
  const chartData = {
    type: "line",
    series: [
      {
        name: "Last 6 days",
        data: [1, 2, 3, 4, 5, 6],
      },
      {
        name: "Last Week",
        data: [6, 5, 4, 3, 2, 1],
      },
    ],
    labels: ["Last 6 days", "Last Week"],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },

        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },

      xaxis: {
        categories: ["01", "02", "03", "04", "05", "06"],
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      tooltip: {
        x: {
          format: "dd MMM",
        },
      },
      colors: ["rgba(90, 106, 207, 1)", "rgba(230, 232, 236, 1)"],
    },
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <p>Donations weekwise trend</p>
        <button
          type="button"
          className="rounded px-2"
          style={{
            fontWeight: "500",
            fontSize: "10px",
            color: "rgba(90, 106, 207, 1)",
            backgroundColor: "rgba(251, 252, 254, 1)",
            border: "0.4px solid rgba(221, 228, 240, 1)",
          }}
        >
          View Report
        </button>
      </div>
      <div className="align-items-start">
        <p style={{ fontWeight: "500", fontSize: "15px", margin: 0 }}>2.568</p>
        <p
          style={{
            fontWeight: "400",
            fontSize: "10px",
            color: "#000000",
            margin: 0,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "10px",
              color: "rgba(0, 172, 79, 1)",
            }}
          >
            <span
              style={{
                color: "rgba(0, 172, 79, 1)",
                fontWeight: "700",
                marginRight: "1rem",
              }}
            >
              <strong>
                <ArrowUpwardIcon
                  color="rgba(0, 172, 79, 1)"
                  fontSize="14px"
                  // style={{ fontWeight: "700" }}
                />
              </strong>
            </span>
            2.1%
          </span>{" "}
          vs last week
        </p>
        <p style={{ fontWeight: "400", fontSize: "10px" }}>
          Donations from 1-6 Dec, 2020
        </p>
      </div>
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={200}
      />
    </>
  );
}

export default DonationGraph;
