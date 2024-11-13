"use client";
import { Chart } from "react-google-charts";

interface Result {
  algorithm: string;        // Name of the algorithm (e.g., 'RSA', 'ECDSA')
  filename: string;         // Name of the file analyzed (e.g., 'pre_wallet.py')
  variant: string;          // Variant of the algorithm (e.g., 'SHA-256', 'RSA-2048')
  type: string;             // Type of algorithm (e.g., 'Asymmetric', 'Symmetric')
  PreQSecurity: number;     // Pre-Quantum bit security level (numeric value)
  PreQScore: string;        // Pre-Quantum risk assessment (e.g., 'Low', 'Medium', 'High')
  PostQSecurity: number;    // Post-Quantum bit security level (numeric value)
  PostQScore: string;       // Post-Quantum risk assessment (e.g., 'Low', 'Medium', 'High')
}


interface ProtocolSupportTableProps {
  result: Result[];
}

export default function ProtocolSupportTable({ result }: ProtocolSupportTableProps) {

  if (!result) {
    return null; // or some other fallback component
  }
  console.log("result",result)

  

  const data = [
    ['Algorithm', 'Filename','Variant', 'Type', 'Pre Quantum Bit Security', 'Pre Quantum Risk','Post Quantum Bit Security', 'Post Quantum Risk'],
    ...result.map((algo) => [
      algo.algorithm,
      algo.filename,
      algo.variant,
      algo.type,
      algo.PreQSecurity,
      algo.PreQScore,
      algo.PostQSecurity,
      algo.PostQScore,
    ]),
  ];
//   const data =
  const options = {
    title: "Detected Cryptography Primitive Analysis",
    width: 2000,
    height: 300,
    backgroundColor: 'transparent',
    cssClassNames: {
      headerRow: "bg-gray-400 border px-10 py-2",
      tableCell: "border px-10 py-2 text-center",
      tableRow: "border px-100 py-2",
    },
  };

  return (
    <div className="overflow-x-auto mb-8">
      <Chart
        chartType="Table"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
      
}
