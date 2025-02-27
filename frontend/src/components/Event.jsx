import React, { useState, useEffect } from "react";
import axios from "axios";

const ContestCard = ({ contest }) => (
    <div
        className="relative h-40 sm:h-44 md:h-48 rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 duration-300"
        style={{
            backgroundImage: `url('${contest.bgImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center p-4">
            <h2 className="text-lg md:text-xl font-bold text-white text-center">{contest.title}</h2>
            <a
                href={contest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-5 py-2 bg-gradient-to-r from-gray-500 to-blue-700 text-white rounded-lg hover:opacity-80 transition duration-300 shadow-lg"
            >
                Join Now
            </a>
        </div>
    </div>
);

const Event = () => {
    const [contestData, setContestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContestData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                console.log(API_URL);
                const response = await axios.get(`${API_URL}/event/tracker`);
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                    setContestData(response.data);
                } else {
                    throw new Error("Invalid data format received from the API.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchContestData();
    }, []);

    const upcomingContests = [contestData[0], contestData[1]];
    const pastContests = [contestData[2], contestData[3]];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center text-gray-700 text-xl font-medium">Loading contests...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center text-red-600 text-xl font-medium">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-12 px-6 sm:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-orange-100 mb-12">
                    🚀 LeetCode Contests
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-5">📅 Upcoming Contests</h2>
                        {upcomingContests.length === 0 ? (
                            <div className="text-center text-gray-300 text-lg">No upcoming contests.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {upcomingContests.map((contest, index) => (
                                    <ContestCard key={index} contest={contest} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-5">⏳ Past Contests</h2>
                        {pastContests.length === 0 ? (
                            <div className="text-center text-gray-300 text-lg">No past contests.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {pastContests.map((contest, index) => (
                                    <ContestCard key={index} contest={contest} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
