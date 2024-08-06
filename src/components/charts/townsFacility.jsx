import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const TownFacility = ({ code }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.gadduck.info/towns/facility?code=${code}`
        );
        const data = response.data.data;

        // 데이터를 차트에 맞게 변환
        const labels = [
          "정부 기관 수",
          "은행 수",
          "병원 수",
          "약국 수",
          "백화점 수",
          "학교 수",
          "숙박 시설 수",
          "교통 시설 수"
        ];
        const counts = [
          data.governmentOfficeCnt,
          data.bankCnt,
          data.hospitalCnt,
          data.pharmacyCnt,
          data.departmentStore,
          data.schoolCnt,
          data.accommodationFacilityCnt,
          data.transportationFacilityCnt
        ];

        if (chart) {
          chart.destroy(); // 이전 차트가 있으면 파괴
        }

        const ctx = chartRef.current.getContext("2d");
        const newChart = new Chart(ctx, {
          type: "bar", // 차트의 유형
          data: {
            labels: labels,
            datasets: [
              {
                label: `행정동 별 집객시설 수`,
                data: counts,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1,
                tension: 0.1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                // Y 축의 ID는 'y'로 설정
                beginAtZero: true,
                ticks: {
                  stepSize: 1, // Y축 값의 스텝을 1로 설정
                },
              },
            },
            plugins: {
              legend: {
                display: true, // 범례 표시
              },
            },
          },
        });
        setChart(newChart);
      } catch (error) {
        console.error("Failed to fetch area data", error);
      }
    };

    fetchData();
  }, [code]); // code가 변경될 때마다 fetchData 실행

  return (
    <div style={{ margin: "40px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TownFacility;