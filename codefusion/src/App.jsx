import React, { useState } from "react";
import axios from "axios";
import './Profile.css'; 

const Profile = () => {
  const [username, setUsername] = useState(""); // State to handle the username input
  const [solvedCount, setSolvedCount] = useState(null); // State to store the number of solved questions
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(false); // State to handle loading status
  // for GFG
  
  const [usernameG, setUsernameG] = useState(""); // State to handle the username input
  const [solvedCountG, setSolvedCountG] = useState(null); // State to store the number of solved questions
  const [errorG, setErrorG] = useState(""); // State to handle errors
  const [loadingG, setLoadingG] = useState(false); 
  const [total , setTotal] = useState(null);
//for codeChef

const [usernameC, setUsernameC] = useState(""); // State for CodeChef username
const [solvedCountC, setSolvedCountC] = useState(null); // State for CodeChef solved count
const [errorC, setErrorC] = useState(""); // State for CodeChef error
const [loadingC, setLoadingC] = useState(false); // State for CodeChef loading status

  
//For Leetcode
  const fetchSolvedQuestionsLeetcode = async () => {
    if (!username) {
      setError("Username cannot be empty.");
      return;
    }

    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      // Update this URL to match your backend service
      const response = await axios.get(`http://localhost:5000/${username}/solved`);

      // console.log(response.data.solvedProblem)
       console.log(response.data.solvedProblem)
      setSolvedCount(response.data.solvedProblem); // Adjust according to your API response
    } catch (err) {
      console.error(err); // Log error for debugging
      setError("Failed to fetch data. Please check the username or try again later.");
      setSolvedCount(null);
    } finally {
      setLoading(false); // End loading
    }};

// For GFG
  const fetchSolvedQuestionsGFG = async () => {
    if (!usernameG) {
      setError("Username cannot be empty.");
      return;
    }

    setLoadingG(true); // Start loading
    setErrorG(""); // Clear previous errors

    try {
      // Update this URL to match your backend service
      const response = await axios.get(`http://localhost:5001/${usernameG}/solved`);

      console.log(response.data.number)
      setSolvedCountG(response.data.number); // Adjust according to your API response
    } catch (err) {
      console.error(err); // Log error for debugging
      setErrorG("Failed to fetch data. Please check the username or try again later.");
      setSolvedCountG(null);
    } finally {
      setLoadingG(false); // End loading
    }
  };
  //for codeChef
  const fetchSolvedQuestionsCodeChef = async () => {
    if (!usernameC) {
      setErrorC("Username cannot be empty.");
      return;
    }

    setLoadingC(true); 
    setErrorC(""); 

    try {
      const response = await axios.get(`http://localhost:5002/${usernameC}/solved`);
      setSolvedCountC(response.data.totalProblemsSolved); 
    } catch (err) {
      console.error(err);
      setErrorC("Failed to fetch data. Please check the username or try again later.");
      setSolvedCountC(null);
    } finally {
      setLoadingC(false); 
    }
  };
 
 
  return (
    <div className="app-container">
        <h1>Profile Info</h1>
        
        {/* LeetCode Profile Section */}
        <div className="profile-section">
            <h2>LeetCode Profile</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter your LeetCode username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={fetchSolvedQuestionsLeetcode} disabled={loading}>
                    {loading ? 'Loading...' : 'Get LeetCode Info'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {solvedCount !== null && <p className="result-message">Total problems solved: {solvedCount}</p>}
        </div>

        {/* GFG Profile Section */}
        <div className="profile-section">
            <h2>GFG Profile</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter your GFG username"
                    value={usernameG}
                    onChange={(e) => setUsernameG(e.target.value)}
                />
                <button onClick={fetchSolvedQuestionsGFG} disabled={loadingG}>
                    {loadingG ? 'Loading...' : 'Get GFG Info'}
                </button>
            </div>
            {errorG && <p className="error-message">{errorG}</p>}
            {solvedCountG !== null && <p className="result-message">Total problems solved: {solvedCountG}</p>}
        </div>

        {/* CodeChef Profile Section */}
        <div className="profile-section">
            <h2>CodeChef Profile</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter your CodeChef username"
                    value={usernameC}
                    onChange={(e) => setUsernameC(e.target.value)}
                />
                <button onClick={fetchSolvedQuestionsCodeChef} disabled={loadingC}>
                    {loadingC ? 'Loading...' : 'Get CodeChef Info'}
                </button>
            </div>
            {errorC && <p className="error-message">{errorC}</p>}
            {solvedCountC !== null && <p className="result-message">Total problems solved: {solvedCountC}</p>}
        </div>
    </div>
  );
};

export default Profile;