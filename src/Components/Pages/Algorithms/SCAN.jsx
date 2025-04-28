import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SCAN() {
  const [start, setStart] = useState("");
  const [queue, setQueue] = useState("");
  const [direction, setDirection] = useState("left");
  const [graphData, setGraphData] = useState(null);

  // Function to calculate SCAN scheduling algorithm with boundary constraints
  const calculateSCAN = () => {
    const startPos = parseInt(start);
    const queueValues = queue.split(",").map((item) => parseInt(item.trim()));

    if (isNaN(startPos) || queueValues.some(isNaN)) {
      alert("Please provide valid numeric inputs.");
      return;
    }

    queueValues.sort((a, b) => a - b);

    const diskMin = 0;  // Lower disk boundary
    const diskMax = 199; // Upper disk boundary (assuming standard disk track range)
    let movement = [];
    let left = queueValues.filter((value) => value < startPos);
    let right = queueValues.filter((value) => value > startPos);

    // SCAN movement handling with proper boundary addition
    if (direction === "left") {
      left.reverse();
      movement = [startPos, ...left, diskMin, ...right];
    } else {
      movement = [startPos, ...right, diskMax, ...left.reverse()];
    }

    // Prepare data for visualization
    const labels = movement.map((_, i) => `Step ${i}`);
    const data = movement.map((pos, index) => ({
      x: index,
      y: pos,
    }));

    setGraphData({
      labels,
      datasets: [
        {
          label: "Disk Head Movement",
          data: data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: function(context) {
            return context.dataIndex === 0 ? 'red' : 'rgb(75, 192, 192)'; // Start point in red
          },
          borderWidth: 2,
          tension: 0,
        },
      ],
    });
  };

  return (
    <div className="scan-container p-8">
      <div className="intro-section mb-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">SCAN Disk Scheduling Algorithm</h1>
        <p className="text-lg mb-4">
          The SCAN Disk Scheduling Algorithm operates like an elevator, moving in one direction and servicing requests along the way. 
          Once it reaches the end, it reverses direction and continues serving requests.
        </p>

        <h3 className="text-2xl font-semibold text-purple-600 mb-2">What is SCAN Disk Scheduling Algorithm?</h3>
        <p className="text-lg mb-4">
          In SCAN, the disk arm moves in one direction, servicing requests along the way. Once it reaches the end of the disk, it
          reverses direction and continues servicing requests in the opposite direction. This ensures that requests are served in
          the order of their arrival, reducing the movement of the disk arm and increasing efficiency.
        </p>
      </div>

      {/* SCAN Demonstration Section */}
      <div className="demo-section bg-gray-200 p-6 rounded-lg">
        <h2 className="text-3xl text-center text-purple-600 mb-4">SCAN Algorithm Demonstration</h2>

        <div className="mb-4">
          <label htmlFor="startPos" className="block text-xl mb-2">Starting Position:</label>
          <input
            type="number"
            id="startPos"
            className="p-2 border rounded"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Enter starting position"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="queue" className="block text-xl mb-2">Request Queue (comma separated):</label>
          <input
            type="text"
            id="queue"
            className="p-2 border rounded"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
            placeholder="Enter disk requests (e.g., 55, 58, 39, 18, 90)"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="direction" className="block text-xl mb-2">Direction:</label>
          <select
            id="direction"
            className="p-2 border rounded"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>

        <button
          onClick={calculateSCAN}
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Calculate SCAN
        </button>

        {/* Line Graph Visualization */}
        {graphData && (
          <div className="mt-8">
            <h3 className="text-2xl text-purple-600 mb-2">SCAN Movement Line Graph</h3>
            <Line
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: "top" },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  x: { title: { display: true, text: "Step" } },
                  y: { title: { display: true, text: "Track Position" } },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SCAN;
