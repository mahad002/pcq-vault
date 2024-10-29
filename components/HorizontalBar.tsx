import { Chart } from "react-google-charts";

// Define the type for result
interface ResultType {
  score_k?: [number, number];
  score_a?: [number, number];
  score_e?: [number, number];
  score_h?: [number, number];
}

export default function HorizontalBar({ result }: { result: ResultType }) {
  if (!result || !result.score_k || !result.score_a || !result.score_e || !result.score_h) {
    return null; // or some other fallback component
  }

  const getScoreEntry = (score: [number, number] | undefined): [string, number, number] => {
    if (!score) {
      return ["Unknown", 0, 0]; // Provide a fallback if score is missing
    }

    return ["Score", score[0], score[1]]; // Return the score values with a label
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
