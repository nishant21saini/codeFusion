import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const LeetCodeCard = () => {
  const [username, setUsername] = useState("");
  const [solvedProblems, setSolvedProblems] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });


  const fetchSolvedQuestionsLeetcode = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    setLoading(true);
    setError(""); 

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API" ,API_URL);
      console.log("Fetching from:", `${API_URL}/leetcode/${username}/solved`);

      const response = await axios.get(`${API_URL}/leetcode/${username}/solved`);
      setSolvedProblems(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please check the username or try again later.");
      setSolvedProblems({ easy: 0, medium: 0, hard: 0 });
    } finally {
      setLoading(false);
    }
  };

  const totalProblems = solvedProblems.easy + solvedProblems.medium + solvedProblems.hard;

  const segments = [
    { percentage: solvedProblems.easy / totalProblems, color: "#10B981", label: "Easy" },
    { percentage: solvedProblems.medium / totalProblems, color: "#FBBF24", label: "Medium" },
    { percentage: solvedProblems.hard / totalProblems, color: "#EF4444", label: "Hard" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || totalProblems === 0) return;
    const ctx = canvas.getContext("2d");

    const drawSegment = (ctx, percentage, color, startAngle) => {
      const endAngle = startAngle + percentage * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(100, 100, 80, startAngle, endAngle);
      ctx.lineTo(100, 100);
      ctx.fillStyle = color;
      ctx.fill();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let startAngle = -0.5 * Math.PI;
    segments.forEach((segment) => {
      drawSegment(ctx, segment.percentage, segment.color, startAngle);
      startAngle += segment.percentage * 2 * Math.PI;
    });
  }, [solvedProblems]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const angle = Math.atan2(mouseY - 100, mouseX - 100);
    let normalizedAngle = angle < -0.5 * Math.PI ? angle + 2 * Math.PI : angle;

    let cumulativeAngle = -0.5 * Math.PI;
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const segmentEndAngle = cumulativeAngle + segment.percentage * 2 * Math.PI;

      if (normalizedAngle >= cumulativeAngle && normalizedAngle <= segmentEndAngle) {
        setHoveredSegment(segment);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
        return;
      }
      cumulativeAngle = segmentEndAngle;
    }

    setHoveredSegment(null);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-orange-200 p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
        {/* LeetCode Logo */}
        <img
          className="h-12 w-12 mx-auto mb-4"
          src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          alt="LeetCode"
        />

        <h2 className="text-xl font-bold text-black mb-4">LeetCode Stats</h2>

        {/* Username Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="Enter LeetCode Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            onClick={fetchSolvedQuestionsLeetcode}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get Data"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Canvas Chart */}
        <div className="relative flex justify-center items-center mb-4">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className="z-10 shadow-md rounded-full bg-white"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          ></canvas>
          {hoveredSegment && (
            <div
              className="absolute bg-black text-white text-sm px-2 py-1 rounded"
              style={{
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y + 10,
              }}
            >
              {hoveredSegment.label}: {(hoveredSegment.percentage * 100).toFixed(1)}%
            </div>
          )}
        </div>

        {/* Problem Stats */}
        <div className="space-y-2">
          <div className="bg-green-100 p-3 rounded-lg shadow-md">
            <span className="text-sm text-green-900">Easy</span>
            <span className="text-xl font-bold text-green-900 block">{solvedProblems.easy}</span>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg shadow-md">
            <span className="text-sm text-yellow-700">Medium</span>
            <span className="text-xl font-bold text-yellow-900 block">{solvedProblems.medium}</span>
          </div>
          <div className="bg-red-100 p-3 rounded-lg shadow-md">
            <span className="text-sm text-red-700">Hard</span>
            <span className="text-xl font-bold text-red-900 block">{solvedProblems.hard}</span>
          </div>
          <div className="bg-gray-900 p-3 rounded-lg shadow-md">
            <span className="text-sm text-white">Total</span>
            <span className="text-xl font-bold text-white block">{totalProblems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeCard;
