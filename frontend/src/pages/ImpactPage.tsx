import Navbar from "../components/Navbar";
import StatusBar from "../components/StatusBar";
import CleanUp from "../assets/cleanup.jpeg";
interface RobotData {
  name: string;
  location: string;
  waste_capacity: number;
  status: "Operating" | "Idle";
}
function ImpactPage() {
  const robotData: RobotData[] = [
    { name: "Robot 1", location: "Singapore", waste_capacity: 100, status: "Idle" },
    { name: "Robot 2", location: "Pacific Ocean", waste_capacity: 30, status: "Operating" },
    { name: "Robot 3", location: "Atlantic Ocean", waste_capacity: 50, status: "Operating" },
  ];
  return (
    <div className="flex">
      <Navbar />
      <main className="flex flex-col items-start justify-start flex-grow p-6 space-y-6">
        <h1 className="text-3xl font-bold">Waste Management</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {robotData.map((robot, index) => (
            <div key={index} className="p-4 transition duration-300 border-2 border-black rounded-md shadow-md hover:bg-gray-100">
              <h2 className="mb-2 text-xl font-bold">{robot.name}</h2>
              <p className="text-gray-600">📍{robot.location}</p>
              <p className={`text-white ${robot.status === "Operating" ? "text-green-500" : "text-red-500"}`}>Status: {robot.status}</p>
              <p className="text-gray-600">Waste Capacity:</p>
              <StatusBar percentage={robot.waste_capacity} />
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="flex flex-auto border-2 border-black">
          <img src={CleanUp} />
        </div>
      </main>
    </div>
  );
}

export default ImpactPage;
