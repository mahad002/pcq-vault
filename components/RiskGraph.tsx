"use client";
import { Chart } from "react-google-charts";

// Define a type for the result prop
type RiskChartProps = {
  result: {
    preQ: {
      high: number;
      medium: number;
      low: number;
    };
    postQ: {
      high: number;
      medium: number;
      low: number;
    };
  };
};

export default function RiskChart({ result }: RiskChartProps) {
  const preQ = result.preQ;
  const postQ = result.postQ;

  const preQData = [
    ["Risk", "Count"],
    ["High", preQ.high],
    ["Medium", preQ.medium],
    ["Low", preQ.low],
  ];

  const postQData = [
    ["Risk", "Count"],
    ["High", postQ.high],
    ["Medium", postQ.medium],
    ["Low", postQ.low],
  ];

  const preQOptions = {
    title: "Pre-Quantum Risk Levels",
    pieHole: 0.4,
    is3D: false,
    colors: ["red", "blue", "green"],
    backgroundColor: "transparent",
  };

  const postQOptions = {
    title: "Post-Quantum Risk Levels",
    pieHole: 0.4,
    is3D: false,
    colors: ["red", "blue", "green"],
    backgroundColor: "transparent",
  };

  return (
    <div className="flex bg-transparent">
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={preQData}
        options={preQOptions}
      />
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={postQData}
        options={postQOptions}
      />
    </div>
  );
}
