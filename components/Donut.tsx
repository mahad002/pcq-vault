import { Chart } from "react-google-charts";

// Define the type for the result prop
interface CipherStrengthResult {
  secure: number;
  strong: number;
  weak: number;
  insecure: number;
}

export default function DonutChart({ result }: { result: CipherStrengthResult }) {

    console.log("Donut Chart Result: ", result);  
    // Prepare data for the chart
    const data = [
        ["Strength", "Count"],
        ["Secure", result.secure],
        ["Recommended", result.strong],
        ["Weak", result.weak],
        ["Insecure", result.insecure],
    ];

    const options = {
        title: "Cipher Suite Security Strength",
        titleTextStyle: { fontSize: 20 },
        pieHole: 0.2,
        is3D: false,
        colors: ["green", "blue", "red", "orange"],
        chartArea: { width: "60%", height: "60%", top: 10 },
        legend: { position: "bottom" },
        backgroundColor: 'transparent',
    };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={data}
            options={options}
        />
    );
}
