import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeetCodeCard  from "./Leetcode";

const Profile = ({ userData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  console.log(selectedPlatform);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (selectedPlatform) {
      navigate(`/${selectedPlatform}`);
    }
  }, [selectedPlatform, navigate]);

 
  

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-xl shadow-2xl m-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-600">
        User Profile
      </h2>

      {/* Profile Info (Show only if user is registered) */}
      {userData?.registered ? (
        <div className="text-center mb-8">
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500 hover:border-orange-500 transition-all duration-300"
          />
          <h3 className="text-2xl font-semibold mb-2">{userData.name}</h3>
          <p className="text-gray-400">{userData.bio}</p>
        </div>
      ) : (
        <p className="text-center text-gray-400 mb-6">Sign in to view your progress</p>
      )}

      {/* Platform Buttons */}
      <div className="flex justify-center space-x-4 mb-8">
        
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

      {/* Platform Data (Show only if registered) */}
      {userData?.registered && selectedPlatform && (
        <div className="bg-gray-700 p-6 rounded-xl animate-fade-in">
          <h3 className="text-xl font-semibold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {selectedPlatform.toUpperCase()} Stats
          </h3>
          <div className="space-y-3">
            <p className="text-gray-200"><strong>Problems Solved:</strong> {userData[selectedPlatform]?.problemsSolved || "N/A"}</p>
            <p className="text-gray-200"><strong>Rank:</strong> {userData[selectedPlatform]?.rank || "N/A"}</p>
            <p className="text-gray-200"><strong>Last Active:</strong> {userData[selectedPlatform]?.lastActive || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
