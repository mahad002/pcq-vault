import { Chart } from "react-google-charts";

// Define a type for the result prop
type BarChartProps = {
  result: {
    scores: (string | number)[][]; // Adjust the type according to your data structure
  };
};

export default function BarChart({ result }: BarChartProps) {
  if (!result || !Array.isArray(result.scores)) {
    return <p>Error: No valid scores data available</p>;
  }

  // Filter out items where the first element is "None"
  const data = result.scores.filter(
    (item) => Array.isArray(item) && item[0] !== "None"
  );
  console.log(data);

  const options = {
    title: "Supported Variants and Bit Security",
    chartArea: { width: "50%" },
    backgroundColor: "transparent",
    hAxis: {
      title: "Pre Quantum Bit Security",
      minValue: 0,
    },
    vAxis: {
      title: "Supported Variants",
    },
  };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
