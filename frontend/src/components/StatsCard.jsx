
import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsCard = ({ easy = 0, medium = 0, hard = 0 }) => {
    const totalSolved = easy + medium + hard;

    // Chart Data
    const data = {
        labels: ["Easy", "Medium", "Hard"],
        datasets: [
            {
                data: [easy, medium, hard],
                backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                hoverBackgroundColor: ["#45a049", "#ffb300", "#d32f2f"],
            },
        ],
    };

    const options = {
        cutout: "70%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const ProblemBreakdownItem = ({ label, value, color }) => (
        <div className="flex justify-between p-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded">
            <span className={`text-${color}-500`}>{label}</span>
            <span>{value}</span>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md mx-auto">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-600 mb-4">DSA Progress</h2>

            {/* Doughnut Chart */}
            <div className="relative w-40 h-40 my-4">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">{totalSolved}</span>
                </div>
            </div>

            {/* Problem Breakdown */}
            <div className="w-full flex flex-col gap-2">
                <ProblemBreakdownItem label="Easy" value={easy} color="green" />
                <ProblemBreakdownItem label="Medium" value={medium} color="yellow" />
                <ProblemBreakdownItem label="Hard" value={hard} color="red" />
            </div>
        </div>
    );
};

StatsCard.propTypes = {
    easy: PropTypes.number,
    medium: PropTypes.number,
    hard: PropTypes.number,
};

export default StatsCard;