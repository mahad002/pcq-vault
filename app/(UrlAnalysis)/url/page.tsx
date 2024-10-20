"use client";
import Navbar from "../../navbar/page"
import UrlScan from "./urlscan/page";


export default function UrlAnalysis() {


  return (
    <div className="bg-blue-50 h-screen">
      <Navbar />
        <div>
            <UrlScan />
        </div>
    </div>

    
  )
}