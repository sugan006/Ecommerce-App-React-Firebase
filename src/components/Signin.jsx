// src/components/Signin.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import your firebase setup
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to homepage after successful Signin
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSignin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>
      <footer className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </a>
        </p>
      </footer>
    </div>
  );
};
