import { Chart } from "react-google-charts";

// Define the type for result
interface ResultType {
  score_k?: { [key: string]: number };
  score_a?: { [key: string]: number };
  score_e?: { [key: string]: number };
  score_h?: { [key: string]: number };
}

export default function HorizontalBar({ result }: { result: ResultType }) {
  if (!result) {
    return null; // Return nothing if result is missing
  }

  const getScoreEntry = (scoreObj: { [key: string]: number } | undefined): [string, number, number] => {
    if (!scoreObj || Object.keys(scoreObj).length === 0) {
      return ["Unknown", 0, 0]; // Provide a fallback if scoreObj is missing or empty
    }

    const entry = Object.entries(scoreObj)[0];
    return [entry[0], entry[1], 0]; // Return the first key and its value, defaulting the third column to 0
  };

  const data = [
    ["Cryptographic Algorithm", "Pre-Quantum", "Post-Quantum"], // Header row
    getScoreEntry(result.score_k),
    getScoreEntry(result.score_a),
    getScoreEntry(result.score_e),
    getScoreEntry(result.score_h),
  ];

  const options = {
    chart: {
      backgroundColor: { fill: 'transparent' },
      chartArea: {
        backgroundColor: 'transparent',
      },
    },
    hAxis: {
      title: "Score",
    },
    vAxis: {
      title: "Cryptographic Algorithm",
    },
    legend: { position: "none" }, // Adjust legend position if necessary
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
