
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const REACT_APP_API_URL = "http://localhost:5009";

const Signup = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to handle errors

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(`${REACT_APP_API_URL}/authentication/signup`, {
        username,
        password,
        firstName,
        lastName,
      });

      console.log("Signup successful", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstname", response.data.firstName);  
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again."); // Show error to user
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-600 mb-8">Signup to continue</p>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>} {/* Display error if any */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Email
            </label>
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
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
              Password
            </label>
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
            Signup
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account? <a href="/SignInPage" className="text-blue-600 hover:underline">SignIn</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
