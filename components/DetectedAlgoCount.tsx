import { Chart } from "react-google-charts";

// Define the type for the result prop
interface AlgoCountResult {
  [Type: string]: number; // Each key is a string representing the algorithm type, and the value is the count (number).
}

export default function DetectedAlgoCount({ result }: { result: AlgoCountResult }) {
  console.log("result", result);

  // Convert result object to array format suitable for Google Charts
  const chartData = Object.entries(result).map(([Type, count]) => [Type, count]);

  const options = {
    chart: {
      title: "Algorithm Types",
    },
    hAxis: {
      title: "Type",
    },
    vAxis: {
      title: "Count",
    },
    backgroundColor: 'transparent',
  };

  return (
    <Chart
      chartType="Bar"
      width="70%"
      height="400px"
      data={[["Type", "Count"], ...chartData]} // Data for the chart
      options={options} // Chart options
    />
  );
}
