import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeetCodeCard from "./Leetcode";

const Profile = ({ userData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPlatform) {
      navigate(`/${selectedPlatform}`);
    }
  }, [selectedPlatform, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between  text-white">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl m-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-600">
            User Profile
          </h2>
          <p className="text-center text-gray-400 mb-6">Check your progress ...</p>

    
          <div className="flex justify-center space-x-4 mb-8to-gray-900">
            <button
              key="Leetcode"
              onClick={() => setSelectedPlatform("LeetCodeCard")}
              className="bg-gradient-to-r from-orange-600 to-orange-200 hover:from-orange-700 hover:to-white-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              LeetCode
            </button>
            <button
              key="GeeksForGeeks"
              onClick={() => setSelectedPlatform("geeksForgeeks")}
              className="bg-gradient-to-r from-green-600 to-green-200 hover:from-green-700 hover:to-white-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              GeeksForGeeks
            </button>
            <button
              key="CodeForces"
              onClick={() => setSelectedPlatform("CodeChef")}
              className="bg-gradient-to-r from-yellow-600 to-blue-200 hover:from-yellow-700 hover:to-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              CodeChef
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default Profile;
