// import React, { useState } from "react";
// import axios from "axios";
// import './index.css'; 
// import Header  from "./components/Header";

// const Profile = () => {
//   const [username, setUsername] = useState(""); // State to handle the username input
//   const [solvedCount, setSolvedCount] = useState(null); // State to store the number of solved questions
//   const [error, setError] = useState(""); // State to handle errors
//   const [loading, setLoading] = useState(false); // State to handle loading status
//   // for GFG
  
//   const [usernameG, setUsernameG] = useState(""); // State to handle the username input
//   const [solvedCountG, setSolvedCountG] = useState(null); // State to store the number of solved questions
//   const [errorG, setErrorG] = useState(""); // State to handle errors
//   const [loadingG, setLoadingG] = useState(false); 
//   const [total , setTotal] = useState(null);
// //for codeChef

// const [usernameC, setUsernameC] = useState(""); // State for CodeChef username
// const [solvedCountC, setSolvedCountC] = useState(null); // State for CodeChef solved count
// const [errorC, setErrorC] = useState(""); // State for CodeChef error
// const [loadingC, setLoadingC] = useState(false); // State for CodeChef loading status

  
// //For Leetcode
//   const fetchSolvedQuestionsLeetcode = async () => {
//     if (!username) {
//       setError("Username cannot be empty.");
//       return;
//     }

//     setLoading(true); // Start loading
//     setError(""); // Clear previous errors

//     try {
//       // Update this URL to match your backend service
//       const response = await axios.get(`http://localhost:5005/${username}/solved`);

//       // console.log(response.data.solvedProblem)
//        console.log(response.data.solvedProblem)
//       setSolvedCount(response.data.solvedProblem); // Adjust according to your API response
//     } catch (err) {
//       console.error(err); // Log error for debugging
//       setError("Failed to fetch data. Please check the username or try again later.");
//       setSolvedCount(null);
//     } finally {
//       setLoading(false); // End loading
//     }};

// // For GFG
//   const fetchSolvedQuestionsGFG = async () => {
//     if (!usernameG) {
//       setError("Username cannot be empty.");
//       return;
//     }

//     setLoadingG(true); // Start loading
//     setErrorG(""); // Clear previous errors

//     try {
//       // Update this URL to match your backend service
//       const response = await axios.get(`http://localhost:5001/${usernameG}/solved`);

//       console.log(response.data.number)
//       setSolvedCountG(response.data.number); // Adjust according to your API response
//     } catch (err) {
//       console.error(err); // Log error for debugging
//       setErrorG("Failed to fetch data. Please check the username or try again later.");
//       setSolvedCountG(null);
//     } finally {
//       setLoadingG(false); // End loading
//     }
//   };
//   //for codeChef
//   const fetchSolvedQuestionsCodeChef = async () => {
//     if (!usernameC) {
//       setErrorC("Username cannot be empty.");
//       return;
//     }

//     setLoadingC(true); 
//     setErrorC(""); 

//     try {
//       const response = await axios.get(`http://localhost:5002/${usernameC}/solved`);
//       setSolvedCountC(response.data.totalProblemsSolved); 
//     } catch (err) {
//       console.error(err);
//       setErrorC("Failed to fetch data. Please check the username or try again later.");
//       setSolvedCountC(null);
//     } finally {
//       setLoadingC(false); 
//     }
//   };
 
 
//   return (
//     <div className="app-container">
//         <h1>Profile Info</h1>
        
//         {/* LeetCode Profile Section */}
//         <div className="profile-section">
//             <h2>LeetCode Profile</h2>
//             <div className="input-group">
//                 <input
//                     type="text"
//                     placeholder="Enter your LeetCode username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <button onClick={fetchSolvedQuestionsLeetcode} disabled={loading}>
//                     {loading ? 'Loading...' : 'Get LeetCode Info'}
//                 </button>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             {solvedCount !== null && <p className="result-message">Total problems solved: {solvedCount}</p>}
//         </div>

//         {/* GFG Profile Section */}
//         <div className="profile-section">
//             <h2>GFG Profile</h2>
//             <div className="input-group">
//                 <input
//                     type="text"
//                     placeholder="Enter your GFG username"
//                     value={usernameG}
//                     onChange={(e) => setUsernameG(e.target.value)}
//                 />
//                 <button onClick={fetchSolvedQuestionsGFG} disabled={loadingG}>
//                     {loadingG ? 'Loading...' : 'Get GFG Info'}
//                 </button>
//             </div>
//             {errorG && <p className="error-message">{errorG}</p>}
//             {solvedCountG !== null && <p className="result-message">Total problems solved: {solvedCountG}</p>}
//         </div>

//         {/* CodeChef Profile Section */}
//         <div className="profile-section">
//             <h2>CodeChef Profile</h2>
//             <div className="input-group">
//                 <input
//                     type="text"
//                     placeholder="Enter your CodeChef username"
//                     value={usernameC}
//                     onChange={(e) => setUsernameC(e.target.value)}
//                 />
//                 <button onClick={fetchSolvedQuestionsCodeChef} disabled={loadingC}>
//                     {loadingC ? 'Loading...' : 'Get CodeChef Info'}
//                 </button>
//             </div>
//             {errorC && <p className="error-message">{errorC}</p>}
//             {solvedCountC !== null && <p className="result-message">Total problems solved: {solvedCountC}</p>}
//         </div>
//     </div>
//   );
// };

// export default Profile;




// import React from 'react';
// import Header from './components/Header';
// import StatsCard from './components/StatsCard';
// import ActivityChart from './components/ActivityChart';
// import Footer from './components/Footer';
// import { FaGithub, FaLinkedin, FaCode, FaChartLine, FaLaptopCode } from 'react-icons/fa';

// const Homepage = () => {
//   const userData = {
//     name: 'Nishant',
//     bio: 'Passionate coder and problem solver.',
//     profilePicture: 'https://via.placeholder.com/150',
//     socialLinks: [
//       { url: 'https://github.com', icon: <FaGithub size={24} /> },
//       { url: 'https://linkedin.com', icon: <FaLinkedin size={24} /> },
//     ],
//     stats: [
//       {
//         platform: 'LeetCode',
//         problemsSolved: 150,
//         totalProblems: 500,
//         color: 'border-orange-500',
//         icon: <FaCode className="text-orange-500" />,
//       },
//       {
//         platform: 'Codeforces',
//         problemsSolved: 200,
//         totalProblems: 1000,
//         color: 'border-blue-500',
//         icon: <FaChartLine className="text-blue-500" />,
//       },
//       {
//         platform: 'GeeksforGeeks',
//         problemsSolved: 300,
//         totalProblems: 800,
//         color: 'border-green-500',
//         icon: <FaLaptopCode className="text-green-500" />,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <Header
//           name={userData.name}
//           bio={userData.bio}
//           profilePicture={userData.profilePicture}
//           socialLinks={userData.socialLinks}
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {userData.stats.map((stat, index) => (
//             <StatsCard
//               key={index}
//               platform={stat.platform}
//               problemsSolved={stat.problemsSolved}
//               totalProblems={stat.totalProblems}
//               color={stat.color}
//               icon={stat.icon}
//             />
//           ))}
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <ActivityChart />
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Homepage;