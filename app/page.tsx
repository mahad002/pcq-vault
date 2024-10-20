import Navbar from "./navbar/page"
import Dashboard from "./dashboard/page"

export default function Home() {
  return (
    <div className="bg-blue-50">
      <div>
      <Navbar />
      </div>
      <div className=" h-screen">
        <Dashboard />
      </div>
    </div>
  )
}
