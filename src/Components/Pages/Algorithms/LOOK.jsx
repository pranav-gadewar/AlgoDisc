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

function LOOK() {
  const [start, setStart] = useState("");
  const [queue, setQueue] = useState("");
  const [direction, setDirection] = useState("left");
  const [graphData, setGraphData] = useState(null);

  // Function to calculate the LOOK scheduling algorithm
  const calculateLOOK = () => {
    const startPos = parseInt(start);
    const queueValues = queue.split(",").map((item) => parseInt(item.trim())).filter((n) => !isNaN(n));

    if (isNaN(startPos) || queueValues.length === 0) {
      alert("Please provide valid numeric inputs.");
      return;
    }

    queueValues.sort((a, b) => a - b);

    let left = queueValues.filter((req) => req < startPos);
    let right = queueValues.filter((req) => req >= startPos);

    let sequence = [startPos];

    if (direction === "left") {
      left = left.reverse();
      sequence.push(...left, ...right);
    } else {
      sequence.push(...right, ...left.reverse());
    }

    const labels = sequence.map((_, index) => `Step ${index + 1}`);
    const dataPoints = sequence.map((pos, index) => ({ x: index, y: pos }));

    setGraphData({
      labels,
      datasets: [
        {
          label: "Disk Head Movement",
          data: dataPoints,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2,
          tension: 0,
        },
      ],
    });
  };

  return (
    <div className="look-container p-8">
      <div className="intro-section mb-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">LOOK Disk Scheduling Algorithm</h1>
        <p className="text-lg mb-4">
          The LOOK Disk Scheduling Algorithm is an improvement over SCAN, where the disk head moves in one direction and
          reverses when the requests in that direction are completed. It looks for requests until the end and then goes in the
          opposite direction, improving efficiency by only scanning the requested positions.
        </p>

        <h3 className="text-2xl font-semibold text-purple-600 mb-2">What is LOOK Disk Scheduling Algorithm?</h3>
        <p className="text-lg mb-4">
          The LOOK algorithm is similar to SCAN, but it only moves the head to the last request in the direction it's currently
          moving, rather than scanning the entire disk. Once the head completes scanning in one direction, it reverses its direction
          and services the remaining requests. This reduces unnecessary movement and can be more efficient than SCAN.
        </p>
      </div>

      {/* LOOK Demonstration Section */}
      <div className="demo-section bg-gray-200 p-6 rounded-lg">
        <h2 className="text-3xl text-center text-purple-600 mb-4">LOOK Algorithm Demonstration</h2>
        
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
          onClick={calculateLOOK}
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Calculate LOOK
        </button>

        {/* Line Graph Diagram */}
        {graphData && (
          <div className="mt-8">
            <h3 className="text-2xl text-purple-600 mb-2">LOOK Movement Line Graph</h3>
            <Line
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Step",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Track Position",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LOOK;
