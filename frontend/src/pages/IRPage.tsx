import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import Footage1 from "../assets/Footages/footage1.mp4";
import Footage2 from "../assets/Footages/footage2.mp4";
import Footage3 from "../assets/Footages/footage3.mp4";

function IRPage() {
  const [boxes, setBoxes] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const footages = [Footage1, Footage2, Footage3];
  const [isVideo, setIsVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(Footage1);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsVideo(false);
      const data = new FormData();
      data.append("image_file", file, "image_file");
      try {
        setIsLoading(true);
        const apiUrl = "https://aiqua-7c55de76013c.herokuapp.com/detect";
        axios
          .post(apiUrl, data)
          .then((response) => {
            const boxesData = response.data;
            setBoxes(boxesData);
            drawImageAndBoxes(file, boxesData);
          })
          .catch((error) => console.error("Error fetching data:", error))
          .finally(() => {
            setIsLoading(false);
          });
        console.log("Success");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const drawImageAndBoxes = (file: File, boxes: number[][]) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 3;
        ctx.font = "18px serif";
        boxes.forEach(([x1, y1, x2, y2, label, confidence]) => {
          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
          ctx.fillStyle = "#00ff00";
          const width = ctx.measureText(label.toString()).width;
          ctx.fillRect(x1, y1, width + 80, 25);
          ctx.fillStyle = "#000000";
          ctx.fillText(`${label} (${(confidence * 100).toFixed(2)}%)`, x1, y1 + 18);
        });
      }
    };
  };

  const runSimulation = () => {
    const randomIndex = Math.floor(Math.random() * footages.length);
    setVideoSrc(footages[randomIndex]);
    setIsVideo(true);
    console.log(randomIndex);
  };

  return (
    <div className="flex">
      <Navbar />
      <main className="flex flex-col items-start justify-start flex-grow p-6 space-y-6">
        <h1 className="text-3xl font-bold">Surveillance</h1>
        <div className="flex flex-row">
          <button className="p-2 mr-2 text-white rounded cursor-pointer bg-sky-500" onClick={runSimulation}>
            Run Simulation
          </button>
          <label htmlFor="uploadButton" className="p-2 text-white rounded cursor-pointer bg-sky-500">
            Upload Image
          </label>
          <input type="file" id="uploadButton" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
        <div className="items-center flex-auto">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <BounceLoader color="#33bbee" />
            </div>
          ) : isVideo ? (
            <video key={videoSrc} className="w-full h-full mt-1 border-2 border-black" autoPlay>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <canvas className="w-full h-full mt-1 border-2 border-black"></canvas>
          )}
        </div>
      </main>
    </div>
  );
}

export default IRPage;
