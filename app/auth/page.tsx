"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

// Animated Sparkle component with shimmering effect
const AnimatedSparkle = ({ className = "", delay = 0 }) => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    initial={{ scale: 0.8, opacity: 0.7 }}
    animate={{
      scale: [0.8, 1.1, 0.9, 1],
      opacity: [0.7, 1, 0.8, 1],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
      fill="currentColor"
    />
  </motion.svg>
);

// Theme toggle icon component
const ThemeToggleIcon = ({ isDark }: { isDark: boolean }) => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: 0 }}
    animate={{ rotate: isDark ? 0 : 180 }}
    transition={{ duration: 0.5 }}
  >
    {isDark ? (
      <path
        d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <g>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    )}
  </motion.svg>
);

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

  type DirectionalVariant = (direction: number) => AnimationProps;

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
  const bgColor = theme === "dark" ? "bg-black" : "bg-gray-50";
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const inputBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const secondaryText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const tertiaryText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  // Adjust styles to ensure perfect fitting without scrollability
  const steps = [
    // Welcome Step
    <motion.div
      key="welcome"
      className={`flex flex-col items-center relative justify-between h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-50%] h-[200%] skew-y-12"
        )}
      />

      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border flex items-center justify-center`}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <ThemeToggleIcon isDark={theme === "dark"} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
        <div className="relative mb-12">
          <svg
            className="w-32 h-32 text-gray-700"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 15 L65 35 L85 50 L65 65 L50 85 L35 65 L15 50 L35 35 Z"
              stroke="currentColor"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* <motion.div
              className="w-16 h-2 bg-purple-500 rounded-full rotate-45 absolute -top-8 -left-4"
              animate={{
                opacity: [0.7, 1, 0.7],
                width: ["4rem", "4.5rem", "4rem"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            /> */}
            {/* <div className="w-12 h-12 bg-gray-300 rounded-full" /> */}
          </div>
          <div className="absolute -top-4 -left-4 text-purple-300">
            <AnimatedSparkle />
          </div>
          <div className="absolute bottom-0 -right-8 text-purple-200">
            <AnimatedSparkle delay={1.5} />
          </div>
        </div>
        <h1 className="text-6xl font-medium text-left mb-4">
          Your Event Guide
        </h1>
        <p className={`text-xl ${secondaryText} mb-6 text-left`}>
          Discover, book, and enjoy events like never before.
        </p>
      </div>
      <button
        onClick={handleNext}
        className={`w-full py-4 ${
          theme === "dark"
            ? "bg-purple-500 hover:bg-pink-400"
            : "bg-purple-600 hover:bg-purple-500"
        } rounded-lg text-white font-semibold mb-8 transition-all duration-300 flex items-center justify-between px-6`}
      >
        <span>Discover</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex justify-center space-x-2 w-full mb-4">
        {[0, 1, 2].map((step) => (
          <motion.div
            key={step}
            className={`h-1 rounded-full transition-all duration-300 ${
              step === activeStep ? "bg-purple-500" : "bg-gray-600"
            }`}
            animate={{
              width: step === activeStep ? "2rem" : "1rem",
              opacity: step === activeStep ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>,

    // App Info Step
    <motion.div
      key="info"
      className={`flex flex-col items-center relative justify-between h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border flex items-center justify-center`}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <ThemeToggleIcon isDark={theme === "dark"} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center">
          Hello <AnimatedSparkle className="ml-2" />
        </h2>
        <div className="mb-10 w-full space-y-4">
          {[
            {
              icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
              title: "Discover Events",
              description: "Find exciting events happening around you",
            },
            {
              icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
              title: "Book Tickets",
              description: "Secure your spot with our simple booking system",
            },
            {
              icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
              title: "Get Updates",
              description: "Stay informed with real-time notifications",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`${cardBg} rounded-xl p-6 border  border-gray-800 z-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start ">
                <div
                  className={`p-3 rounded-full ${
                    theme === "dark"
                      ? "bg-purple-500 bg-opacity-20"
                      : "bg-pink-600 bg-opacity-20"
                  } mr-4`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      theme === "dark" ? "text-purple-500" : "text-purple-600"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className={secondaryText}>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className={`w-full py-4 ${
          theme === "dark"
            ? "bg-purple-500 hover:bg-pink-400"
            : "bg-purple-600 hover:bg-purple-500"
        } rounded-lg text-white font-semibold mb-8 transition-all duration-300 flex items-center justify-between px-6`}
      >
        <span>Continue</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex justify-center space-x-2 w-full mb-4">
        {[0, 1, 2].map((step) => (
          <motion.div
            key={step}
            className={`h-1 rounded-full transition-all duration-300 ${
              step === activeStep ? "bg-purple-500" : "bg-gray-600"
            }`}
            animate={{
              width: step === activeStep ? "2rem" : "1rem",
              opacity: step === activeStep ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>,

    // Login/Signup Step
    <motion.div
      key="auth"
      className={`flex flex-col relative  h-[100vh] max-h-[100vh] p-6 ${bgColor} ${textColor} overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${cardBg} ${borderColor} border flex items-center justify-center`}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          <ThemeToggleIcon isDark={theme === "dark"} />
        </button>
      </div>
      <div className="flex-1 flex flex-col w-full justify-center">
        <div className="flex flex-col   ">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            Join Up <AnimatedSparkle className="ml-2" />
          </h2>
          <div
            className={`flex mb-8  rounded-full overflow-hidden border ${borderColor} p-1`}
          >
            <button
              className={`flex-1 py-2 px-4 font-medium text-center transition-all duration-300 rounded-full ${
                activeTab === "login"
                  ? theme === "dark"
                    ? "bg-purple-500 text-white"
                    : "bg-purple-600 text-white"
                  : `${tertiaryText} hover:${
                      theme === "dark" ? "text-purple-500" : "text-pink-600"
                    }`
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 px-4 font-medium text-center transition-all duration-300 rounded-full ${
                activeTab === "signup"
                  ? theme === "dark"
                    ? "bg-purple-500 text-white"
                    : "bg-purple-600 text-white"
                  : `${tertiaryText} hover:${
                      theme === "dark" ? "text-purple-500" : "text-pink-600"
                    }`
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
                    className={`w-full ${inputBg} border ${borderColor} rounded-md py-3 px-4 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-500"
                        : "focus:ring-purple-600"
                    } transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-8">
                  <label className={`block ${secondaryText} mb-2`}>
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full ${inputBg} border ${borderColor} rounded-md py-3 px-4 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-500"
                        : "focus:ring-purple-600"
                    } transition-all duration-200`}
                    placeholder="Enter your password"
                  />
                </div>
                <motion.button
                  className={`w-full py-4 ${
                    theme === "dark"
                      ? "bg-purple-500 hover:bg-pink-400"
                      : "bg-purple-600 hover:bg-purple-500"
                  } rounded-lg text-white font-semibold mb-8 transition-all duration-300 flex items-center justify-between px-6`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Login</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
                <p
                  className={`text-center ${tertiaryText} hover:${
                    theme === "dark" ? "text-purple-500" : "text-pink-600"
                  } cursor-pointer transition-colors duration-200`}
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
                    className={`w-full ${inputBg} border ${borderColor} rounded-md py-3 px-4 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-500"
                        : "focus:ring-purple-600"
                    } transition-all duration-200`}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-6">
                  <label className={`block ${secondaryText} mb-2`}>Email</label>
                  <input
                    type="email"
                    className={`w-full ${inputBg} border ${borderColor} rounded-md py-3 px-4 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-500"
                        : "focus:ring-purple-600"
                    } transition-all duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-8">
                  <label className={`block ${secondaryText} mb-2`}>
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full ${inputBg} border ${borderColor} rounded-md py-3 px-4 focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "focus:ring-purple-500"
                        : "focus:ring-purple-600"
                    } transition-all duration-200`}
                    placeholder="Create a password"
                  />
                </div>
                <motion.button
                  className={`w-full py-4 ${
                    theme === "dark"
                      ? "bg-purple-500 hover:bg-pink-400"
                      : "bg-purple-600 hover:bg-purple-500"
                  } rounded-lg text-white font-semibold mb-8 transition-all duration-300 flex items-center justify-between px-6`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Sign Up</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center space-x-2 w-full mb-4">
        {[0, 1, 2].map((step) => (
          <motion.div
            key={step}
            className={`h-1 rounded-full transition-all duration-300 ${
              step === activeStep ? "bg-purple-500" : "bg-gray-600"
            }`}
            animate={{
              width: step === activeStep ? "2rem" : "1rem",
              opacity: step === activeStep ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
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
