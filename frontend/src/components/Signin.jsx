import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios'



const SignIn = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
     console.log("API URL:", API_URL);
  
      const response = await axios.post(`${API_URL}/authentication/signin`, {
        username,
        password,
      });
  
     console.log("Response:", response.data); 
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        localStorage.setItem("firstname", response.data.firstName); 
        navigate("/");
      } else {
        console.error("Token not found in response");
      }
    } catch (error) {
      console.error("Signin failed:", error.response?.data || error.message);
    }
  };
  useEffect(() =>{
    const userToken = localStorage.getItem("token");
    if(userToken) navigate('/');
  },[]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div className="mb-6 text-left">
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none">
            Sign In
          </button>
        </form>

      

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
