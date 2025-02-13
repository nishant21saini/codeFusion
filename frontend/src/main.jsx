import SignInPage from './components/Signin';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';  // Import BrowserRouter
import LeetCodeCard from './components/Leetcode';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import StatsCard from './components/StatsCard.jsx';
import Homepage from './components/Homepage.jsx';
import Profile from './components/Profile.jsx';
import Geeks from './components/Geeks';
import CodeChef from './components/CodeChef';

const Applayout = () => {
  const userData = {
    registered: true,  // Change to false to test unregistered state
    name: "Nishant Saini",
    bio: "Aspiring SDE | DSA Enthusiast",
    profilePicture: "https://source.unsplash.com",
    leetcode: { problemsSolved: 120, rank: "Top 5%", lastActive: "2 days ago" },
    gfg: { problemsSolved: 80, rank: "Expert", lastActive: "1 week ago" },
    codeforces: { problemsSolved: 50, rank: "Specialist", lastActive: "3 days ago" },
  };

  return (
    <div>
      <Header
           profilePicture={userData.profilePicture}
      />
      
       
       <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/Profile" element={<Profile />} />  
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/LeetCodeCard" element={<LeetCodeCard />} />
        <Route path="/geeksForgeeks" element={<Geeks/>} />
        <Route path="/CodeChef" element={<CodeChef/>} />

      </Routes>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Applayout />
    </Router>
  </StrictMode>
);
