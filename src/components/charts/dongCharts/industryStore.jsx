import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const IndustryComparison = ({ code, category }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for IndustryRecently
        const recentlyResponse = await axios.get(
          `https://api.gadduck.info/towns/industry/recently?code=${code}&name=${category}`
        );
        const recentlyData = recentlyResponse.data.data;
        setComment(recentlyData[0].count);

        // Define the order of quarters
        const quarterOrder = [
          "2023년 1분기",
          "2023년 2분기",
          "2023년 3분기",
          "2023년 4분기",
          "2024년 1분기",
        ];

        // Convert data to chart-compatible format and order it
        const recentlyMapped = recentlyData.map((item) => ({
          quarter: `${Math.floor(item.quarter / 10)}년 ${
            item.quarter % 10
          }분기`,
          count: item.count,
        }));

        const labels = quarterOrder;
        const recentlyCounts = labels.map((label) => {
          const item = recentlyMapped.find((d) => d.quarter === label);
          return item ? item.count : 0;
        });

        if (chart) {
          chart.destroy();
        }

        const ctx = chartRef.current.getContext("2d");
        const newChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: `행정동 별 ${category} 점포 수 추이`,
                data: recentlyCounts,
                backgroundColor: "rgba(54, 162, 235, 0.2)", // 파란색 배경
                borderColor: "rgba(54, 162, 235, 1)", // 파란색 경계
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });
        setChart(newChart);
      } catch (error) {
        console.error("Failed to fetch area data", error);
        setIsEmpty(true);
      }
    };

    fetchData();
  }, [code, category, isEmpty]);

  return (
    <div style={{ margin: "40px" }}>
      {isEmpty ? (
        <p>No data available for {category} in these regions.</p>
      ) : (
        <canvas ref={chartRef}></canvas>
      )}
      <div style={{ textAlign: "center" }}>
        <h5>
          현 분기의 점포수는
          <strong className="text-primary">{" " + comment}</strong>개 입니다.
        </h5>
      </div>
    </div>
  );
};

export default IndustryComparison;
