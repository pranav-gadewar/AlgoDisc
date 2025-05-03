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

function CSCAN() {
  const [start, setStart] = useState("");
  const [queue, setQueue] = useState("");
  const [direction, setDirection] = useState("right");
  const [graphData, setGraphData] = useState(null);

  const calculateCSCAN = () => {
    const startPos = parseInt(start);
    const queueValues = queue
      .split(",")
      .map((item) => parseInt(item.trim()))
      .filter((num) => !isNaN(num));

    if (isNaN(startPos) || queueValues.length === 0) {
      alert("Please provide valid numeric inputs.");
      return;
    }

    // Define disk size (assumed)
    const diskSize = 200;

    queueValues.sort((a, b) => a - b);

    const left = queueValues.filter((req) => req < startPos);
    const right = queueValues.filter((req) => req >= startPos);

    const movement = [];
    let sequence = [];

    if (direction === "right") {
      // Move to right -> max -> jump to 0 -> continue from left
      sequence = [
        startPos,
        ...right,
        diskSize - 1, // simulate reaching end
        0,            // simulate circular jump
        ...left,
      ];
    } else {
      // Move to left -> 0 -> jump to max -> continue from right
      sequence = [
        startPos,
        ...left.reverse(),
        0,              // simulate reaching start
        diskSize - 1,   // simulate circular jump
        ...right.reverse(),
      ];
    }

    for (let i = 0; i < sequence.length; i++) {
      movement.push({
        x: i,
        y: sequence[i],
      });
    }

    const labels = sequence.map((_, i) => `Step ${i + 1}`);

    setGraphData({
      labels,
      datasets: [
        {
          label: "Disk Head Movement",
          data: movement,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
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
    <div className="scan-container p-8">
      <div className="intro-section mb-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">C-SCAN Disk Scheduling Algorithm</h1>
        <p className="text-lg mb-4">
          The C-SCAN (Circular SCAN) Disk Scheduling Algorithm is an enhancement of the SCAN algorithm. It moves the disk head
          in one direction (left or right), servicing requests, and when it reaches the end of the disk, it jumps back to the
          beginning without servicing any request during the jump. This results in more predictable movement.
        </p>

        <h3 className="text-2xl font-semibold text-purple-600 mb-2">What is C-SCAN Disk Scheduling Algorithm?</h3>
        <p className="text-lg mb-4">
          In C-SCAN, the head moves in one direction, servicing requests as it goes. Once it reaches the end of the disk, it jumps
          to the other end (circular movement) and continues servicing requests. This method helps avoid the high waiting times
          seen in traditional SCAN algorithms.
        </p>
      </div>

      <div className="demo-section bg-gray-200 p-6 rounded-lg">
        <h2 className="text-3xl text-center text-purple-600 mb-4">C-SCAN Algorithm Demonstration</h2>

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
          <label className="block text-xl mb-2">Direction:</label>
          <button
            onClick={() => setDirection(direction === "right" ? "left" : "right")}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
          >
            Move {direction === "right" ? "Left" : "Right"}
          </button>
        </div>

        <button
          onClick={calculateCSCAN}
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
        >
          Calculate C-SCAN
        </button>

        {graphData && (
          <div className="mt-8">
            <h3 className="text-2xl text-purple-600 mb-2">C-SCAN Movement Line Graph</h3>
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

export default CSCAN;
