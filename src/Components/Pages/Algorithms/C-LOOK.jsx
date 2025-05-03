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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CLOOK() {
  const [start, setStart] = useState("");
  const [queue, setQueue] = useState("");
  const [direction, setDirection] = useState("left");
  const [graphData, setGraphData] = useState(null);

  const calculateCLOOK = () => {
    const startPos = parseInt(start);
    const queueValues = queue
      .split(",")
      .map((item) => parseInt(item.trim()))
      .filter((item) => !isNaN(item));

    if (isNaN(startPos) || queueValues.length === 0) {
      alert("Please provide valid numeric inputs.");
      return;
    }

    const movement = [];
    movement.push(startPos);

    const sortedQueue = [...queueValues].sort((a, b) => a - b);
    const left = sortedQueue.filter((value) => value < startPos);
    const right = sortedQueue.filter((value) => value >= startPos);

    if (direction === "left") {
      // Go to all requests to the left (descending), then jump to the rightmost
      movement.push(...left.slice().reverse(), ...right);
    } else {
      // Go to all requests to the right (ascending), then jump to the leftmost
      movement.push(...right, ...left.slice().reverse());
    }

    // Prepare data for chart
    const labels = movement.map((_, i) => `Step ${i + 1}`);
    const data = movement.map((pos, i) => ({ x: i, y: pos }));

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
          pointHoverRadius: 8,
          borderWidth: 2,
          tension: 0,
        },
      ],
    });
  };

  return (
    <div className="clook-container p-8">
      <div className="intro-section mb-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">
          CLOOK (Circular LOOK) Disk Scheduling Algorithm
        </h1>
        <p className="text-lg mb-4">
          The CLOOK Disk Scheduling Algorithm is an enhancement of the LOOK algorithm that improves efficiency by
          circularly moving the disk head. When the disk head reaches the end of the requested tracks, it immediately
          returns to the start of the disk without scanning the entire disk, effectively reducing unnecessary movement.
        </p>

        <h3 className="text-2xl font-semibold text-purple-600 mb-2">What is CLOOK Disk Scheduling Algorithm?</h3>
        <p className="text-lg mb-4">
          CLOOK is a variant of the LOOK scheduling algorithm, but with a key difference: once the disk head completes its
          movement in one direction and reaches the end of the disk, it jumps back to the start of the disk without scanning
          the positions between the last request and the start. This circular movement reduces the time spent in unnecessary
          movements and can lead to better performance.
        </p>
      </div>

      {/* CLOOK Demonstration Section */}
      <div className="demo-section bg-gray-200 p-6 rounded-lg">
        <h2 className="text-3xl text-center text-purple-600 mb-4">CLOOK Algorithm Demonstration</h2>

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
          onClick={calculateCLOOK}
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Calculate CLOOK
        </button>

        {/* Line Graph Diagram */}
        {graphData && (
          <div className="mt-8">
            <h3 className="text-2xl text-purple-600 mb-2">CLOOK Movement Line Graph</h3>
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

export default CLOOK;
