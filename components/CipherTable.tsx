import { Chart } from "react-google-charts";

// Function to evaluate cipher strength
function evaluateCipherStrength(cipher: string) {
  const secureCiphers = [
    "ECDHE-RSA-AES256-GCM-SHA384",
    "ECDHE-RSA-CHACHA20-POLY1305",
    "ECDHE-RSA-AES128-GCM-SHA256"
  ];

  const weakCiphers = [
    "ECDHE-ECDSA-AES256-SHA",
    "ECDHE-RSA-AES256-SHA",
    "ECDHE-ECDSA-AES128-SHA",
    "ECDHE-RSA-AES128-SHA",
    "AES256-SHA",
    "AES128-SHA"
  ];

  if (secureCiphers.includes(cipher)) {
    return "Secure";
  } else if (weakCiphers.includes(cipher)) {
    return "Weak";
  } else {
    return "Recommended";
  }
}

interface CipherResult {
  tlsver: string;
  cipher: string;
}

interface Result {
  ciphers: CipherResult[];
}

export default function CipherTable({ result }: { result: Result }) {
  if (!result || !result.ciphers || result.ciphers.length === 0) {
    return null;
  }

  // Map the ciphers with evaluated strength
  const data = result.ciphers.map(({ tlsver, cipher }) => {
    const strength = evaluateCipherStrength(cipher);
    return [tlsver, cipher, strength];
  });

  // Add table headers
  data.unshift(["TLS Version", "Cipher Suite", "Strength"]);

  const options = {
    title: "Cipher Table",
    width: 500,
    height: 500,
    cssClassNames: {
      headerRow: "bg-gray-400 h-10",
      tableCell: "border border-black text-center",
      tableRow: "border border-black",
      hoverTableRow: "bg-blue-200",
    },
  };

  return (
    <div className="overflow-x-auto">
      <Chart
        chartType="Table"
        width="100%"
        height="500px"
        data={data}
        options={options}
      />
    </div>
  );
}
