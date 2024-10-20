import { Chart } from "react-google-charts";

interface Cipher {
    [key: string]: unknown; // Change to a more specific type if possible
}

// Function to validate protocol support
function validateProtocolSupport(listOfObjects: Array<Cipher>, protocol: string = ""): string {
    return listOfObjects.some((obj) => Object.values(obj).includes(protocol)) ? "Yes" : "No";
}

interface ProtocolSupportTableProps {
    result: {
        ciphers: Cipher[]; // Replace with a more specific structure if you know it
    };
}

export default function ProtocolSupportTable({ result }: ProtocolSupportTableProps) {
    if (!result || !result.ciphers) {
        return null; // or some other fallback component
    }

    const cipher = result.ciphers;
    console.log(cipher);

    // Check if cipher data is an array
    if (!Array.isArray(cipher)) {
        return <p>Error: Invalid cipher data</p>;
    }

    // Define data for the chart
    const data = [
        ["Protocol", "Support"],
        ["TLS 1.0", validateProtocolSupport(cipher, "tls1")],
        ["TLS 1.1", validateProtocolSupport(cipher, "tls1_1")],
        ["TLS 1.2", validateProtocolSupport(cipher, "tls1_2")],
        ["TLS 1.3", validateProtocolSupport(cipher, "tls1_3")],
    ];

    const options = {
        title: "Protocol Support",
        width: 500,
        height: 500, // Change the height value to a number
        backgroundColor: 'transparent',
        cssClassNames: {
            headerRow: "bg-gray-400 h-10",
            tableCell: "border border-black px-10 py-2 text-center",
            tableRow: "border border-black px-100 py-2",
        },
    };

    return (
        <div className="overflow-x-auto">
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
