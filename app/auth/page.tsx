"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("login");
  const [theme, setTheme] = useState("dark");

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  }, [theme]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Slide animation variants
  // Define interfaces for animation variants
  interface AnimationProps {
    x: number;
    opacity: number;
  }

  interface DirectionalVariant {
    (direction: number): AnimationProps;
  }

  interface AnimationVariants {
    enter: DirectionalVariant;
    center: AnimationProps;
    exit: DirectionalVariant;
  }

  // Slide animation variants
  const variants: AnimationVariants = {
    enter: (direction: number): AnimationProps => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number): AnimationProps => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Theme-based styles
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const tertiaryText = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const accentColor = "purple-600";
  const accentText = "purple-500";

  // Adjust styles to ensure perfect fitting without scrollability
  const steps = [
    // Welcome Step
    <motion.div
      key="welcome"
      className={`flex flex-col items-center justify-between h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
        <div className={`p-4 rounded-full ${cardBg} mb-8`}>
          <Image
            src="/logo.png"
            alt="Media Club Logo"
            width={100}
            height={100}
            className="mb-2"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Media Club
        </h1>
        <p className={`text-xl ${secondaryText} mb-6`}>
          Your personal event guide for 2025
        </p>
        <p className={`${tertiaryText} max-w-xs`}>
          Discover, book, and enjoy events near you with our all-in-one platform
        </p>
      </div>
      <button
        onClick={handleNext}
        className={`w-full py-4 bg-${accentColor} rounded-lg ${textColor} font-semibold mb-8 relative overflow-hidden group`}
      >
        <span className="relative z-10">Next</span>
        <div className="absolute inset-0 h-full w-0 bg-opacity-20 bg-white transition-all duration-300 group-hover:w-full"></div>
      </button>
    </motion.div>,

    // App Info Step
    <motion.div
      key="info"
      className={`flex flex-col items-center justify-between h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Discover the Experience
        </h2>
        <div className="mb-10 w-full space-y-4">
          <motion.div
            className={`${cardBg} rounded-xl p-6 border ${borderColor} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-start">
              <div
                className={`p-3 rounded-full bg-${accentColor} bg-opacity-20 mr-4`}
              >
                <svg
                  className="w-6 h-6 text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Discover Events</h3>
                <p className={secondaryText}>
                  Find exciting events happening around you with just a few taps
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${cardBg} rounded-xl p-6 border ${borderColor} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start">
              <div
                className={`p-3 rounded-full bg-${accentColor} bg-opacity-20 mr-4`}
              >
                <svg
                  className="w-6 h-6 text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Book Tickets</h3>
                <p className={secondaryText}>
                  Secure your spot at events with our simple booking system
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${cardBg} rounded-xl p-6 border ${borderColor} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start">
              <div
                className={`p-3 rounded-full bg-${accentColor} bg-opacity-20 mr-4`}
              >
                <svg
                  className="w-6 h-6 text-purple-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Get Updates</h3>
                <p className={secondaryText}>
                  Stay informed with real-time notifications about your events
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <button
        onClick={handleNext}
        className={`w-full py-4 bg-${accentColor} rounded-lg ${textColor} font-semibold mb-8 relative overflow-hidden group`}
      >
        <span className="relative z-10">Next</span>
        <div className="absolute inset-0 h-full w-0 bg-opacity-20 bg-white transition-all duration-300 group-hover:w-full"></div>
      </button>
    </motion.div>,

    // Login/Signup Step
    <motion.div
      key="auth"
      className={`flex flex-col h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border`}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="flex-1 flex flex-col w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Join the <span className={`text-${accentText}`}>Community</span>
        </h2>
        <div
          className={`flex mb-8 border-b ${borderColor} rounded-t-lg overflow-hidden`}
        >
          <button
            className={`flex-1 py-4 font-semibold text-center transition-colors duration-300 ${
              activeTab === "login"
                ? `text-${accentText} border-b-2 border-${accentText} ${cardBg}`
                : `${tertiaryText} hover:text-${accentText}`
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-semibold text-center transition-colors duration-300 ${
              activeTab === "signup"
                ? `text-${accentText} border-b-2 border-${accentText} ${cardBg}`
                : `${tertiaryText} hover:text-${accentText}`
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "login" ? (
            <motion.div
              className="flex-1"
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <label className={`block ${secondaryText} mb-2`}>Email</label>
                <input
                  type="email"
                  className={`w-full ${inputBg} border ${borderColor} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-${accentText} transition-all duration-200`}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-8">
                <label className={`block ${secondaryText} mb-2`}>
                  Password
                </label>
                <input
                  type="password"
                  className={`w-full ${inputBg} border ${borderColor} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-${accentText} transition-all duration-200`}
                  placeholder="Enter your password"
                />
              </div>
              <button
                className={`w-full py-4 bg-${accentColor} rounded-lg ${textColor} font-semibold mb-4 relative overflow-hidden group`}
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 h-full w-0 bg-opacity-20 bg-white transition-all duration-300 group-hover:w-full"></div>
              </button>
              <p
                className={`text-center ${tertiaryText} hover:text-${accentText} cursor-pointer transition-colors duration-200`}
              >
                Forgot your password?
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="flex-1"
              key="signup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-6">
                <label className={`block ${secondaryText} mb-2`}>Name</label>
                <input
                  type="text"
                  className={`w-full ${inputBg} border ${borderColor} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-${accentText} transition-all duration-200`}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-6">
                <label className={`block ${secondaryText} mb-2`}>Email</label>
                <input
                  type="email"
                  className={`w-full ${inputBg} border ${borderColor} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-${accentText} transition-all duration-200`}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-8">
                <label className={`block ${secondaryText} mb-2`}>
                  Password
                </label>
                <input
                  type="password"
                  className={`w-full ${inputBg} border ${borderColor} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-${accentText} transition-all duration-200`}
                  placeholder="Create a password"
                />
              </div>
              <button
                className={`w-full py-4 bg-${accentColor} rounded-lg ${textColor} font-semibold mb-4 relative overflow-hidden group`}
              >
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 h-full w-0 bg-opacity-20 bg-white transition-all duration-300 group-hover:w-full"></div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>,
  ];

  return (
    <div
      className={`h-[100vh] max-h-[100vh] overflow-hidden fixed inset-0 ${bgColor}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {steps[activeStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
