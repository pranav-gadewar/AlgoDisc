import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CSCAN() {
  const [start, setStart] = useState("");
  const [queue, setQueue] = useState("");
  const [graphData, setGraphData] = useState(null);

  // Function to calculate the C-SCAN scheduling algorithm
  const calculateCSCAN = () => {
    const startPos = parseInt(start);
    const queueValues = queue.split(",").map((item) => parseInt(item.trim()));

    if (isNaN(startPos) || queueValues.some(isNaN)) {
      alert("Please provide valid numeric inputs.");
      return;
    }

    // Sort the queue in ascending order for C-SCAN
    queueValues.sort((a, b) => a - b);

    const movement = [];
    let currentPos = startPos;
    const left = queueValues.filter((value) => value < currentPos);
    const right = queueValues.filter((value) => value > currentPos);

    // For C-SCAN, we first move right, then wrap around to the left
    movement.push(...right, ...left.reverse());

    // Prepare data for the graph diagram
    const labels = Array.from({ length: movement.length }, (_, i) => `Step ${i + 1}`);
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
          borderColor: "rgb(54, 162, 235)", // Different color for C-SCAN
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 2, // Line thickness
          tension: 0, // No smooth curves, make it a straight line
        },
      ],
    });
  };

  return (
    <div className="scan-container p-8">
      <div className="intro-section mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">C-SCAN Disk Scheduling Algorithm</h1>
        <p className="text-lg mb-4">
          The C-SCAN (Circular SCAN) Disk Scheduling Algorithm is an enhancement of the SCAN algorithm. It moves the disk head
          in one direction (left or right), servicing requests, and when it reaches the end of the disk, it jumps back to the
          beginning without servicing any request during the jump. This results in more predictable movement.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-2">What is C-SCAN Disk Scheduling Algorithm?</h3>
        <p className="text-lg mb-4">
          In C-SCAN, the head moves in one direction, servicing requests as it goes. Once it reaches the end of the disk, it jumps
          to the other end (circular movement) and continues servicing requests. This method helps avoid the high waiting times
          seen in traditional SCAN algorithms.
        </p>
      </div>

      {/* C-SCAN Demonstration Section */}
      <div className="demo-section bg-gray-200 p-6 rounded-lg">
        <h2 className="text-3xl text-center text-blue-600 mb-4">C-SCAN Algorithm Demonstration</h2>
        
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

        <button
          onClick={calculateCSCAN}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Calculate C-SCAN
        </button>

        {/* Line Graph Diagram */}
        {graphData && (
          <div className="mt-8">
            <h3 className="text-2xl text-blue-600 mb-2">C-SCAN Movement Line Graph</h3>
            <Line data={graphData} options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  mode: 'index',
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
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CSCAN;
