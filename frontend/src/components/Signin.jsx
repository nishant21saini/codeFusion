import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log("Email:", email, "Password:", password);
    navigate("/dashboard"); // Redirect after successful login
  };

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
              value={email}
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

        <div className="text-center my-6">
          <p className="text-gray-600">Or sign in with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-3 bg-gray-100 rounded-full text-red-600 hover:bg-gray-200 focus:outline-none">
              <FaGoogle size={20} />
            </button>
            <button className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none">
              <FaFacebook size={20} />
            </button>
            <button className="p-3 bg-black rounded-full text-white hover:bg-gray-800 focus:outline-none">
              <FaApple size={20} />
            </button>
          </div>
        </div>

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
