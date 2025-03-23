import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("✅ User logged in successfully!");
        navigate("/"); // Redirect to dashboard after successful login
      } else {
        setMessage(`❌ ${data.message || "Login failed"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#cdcae9]">
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="w-[800px] min-h-[500px] flex bg-white rounded-lg shadow-lg overflow-hidden"
      >
        {/* Left Section */}
        <div className="w-1/2 bg-[#6f68d1] flex flex-col justify-center items-center text-white p-8 rounded-r-[100px]">
          <h2 className="text-2xl font-bold">Hello, Welcome!</h2>
          <p className="mt-2">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-4 border-2 bg-white text-[#6f68d1] hover:bg-[#5a54c7] hover:text-white font-bold py-3 px-8 rounded-md text-lg"
          >
            Register
          </button>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 h-full flex flex-col justify-center p-8 min-h-[500px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
          <form className="w-full" onSubmit={submit}>
            <div className="relative mb-4">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={inputHandle}
                className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f68d1] text-lg bg-slate-100"
              />
              <i className="absolute left-4 top-4 text-gray-500 fa fa-envelope text-lg"></i>
            </div>

            <div className="relative mb-4">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={inputHandle}
                className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6f68d1] text-lg bg-slate-100"
              />
              <i className="absolute left-4 top-4 text-gray-500 fa fa-lock text-lg"></i>
            </div>

            <p className="text-right text-[#6f68d1] cursor-pointer hover:underline">
              Forgot password?
            </p>

            {message && (
              <p
                className={`mt-4 text-lg font-semibold ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-[#6f68d1] hover:shadow-lg text-white font-bold py-3 text-lg rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;