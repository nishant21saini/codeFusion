import SignInPage from './components/Signin';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import LeetCodeCard from './components/Leetcode';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Signup from './components/Signup';
import Homepage from './components/Homepage.jsx';
import Profile from './components/Profile.jsx';
import Geeks from './components/Geeks';
import CodeChef from './components/CodeChef';
import Event from './components/Event.jsx'

const Applayout = () => {
  return (
    <div>
      <Header
      />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/event" element = {<Event/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />  
        <Route path="/SigninPage" element={<SignInPage />} />
        <Route path="/LeetCodeCard" element={<LeetCodeCard />} />
        <Route path="/geeksForgeeks" element={<Geeks/>} />
        <Route path="/CodeChef" element={<CodeChef/>} />
      </Routes>
      <Footer/>
       
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
