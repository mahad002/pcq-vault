import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  


export default function CardDetails({result}: any) {
    const cardResult = result
    console.log("cardresult",cardResult)
    console.log(cardResult.detectedAlgo.preQDetected)
    return (
        <div className="grid grid-cols-8 text-sm bg-background">
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.files}</CardTitle>
              </CardHeader>
              <CardContent>
              Files Scanned
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.lines}</CardTitle>
              </CardHeader>
              <CardContent>
                Number of Lines Scanned
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.detectedAlgo.preQDetected}</CardTitle>
              </CardHeader>
              <CardContent>
                Pre-Quantum Cryptographic Algorithm Detection
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.detectedAlgo.postQDetected}</CardTitle>
              </CardHeader>
              <CardContent>
                Post-Quantum Cryptographic Algorithm Detection
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.vulnerability.PreQRisk}</CardTitle>
              </CardHeader>
              <CardContent>
                Pre-Quantum Vulnerability Detection
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.vulnerability.PostQRisk}</CardTitle>
              </CardHeader>
              <CardContent>
                Post-Quantum Vulnerability Detection
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.grade.gradePre}</CardTitle>
              </CardHeader>
              <CardContent>
                Pre-Quantum Grade
              </CardContent>
            </Card>
            <Card >
              <CardHeader>
                <CardTitle>{cardResult.grade.gradePost}</CardTitle>
              </CardHeader>
              <CardContent>
                Post Quantum Grade
              </CardContent>
            </Card>
        </div>
    )
}