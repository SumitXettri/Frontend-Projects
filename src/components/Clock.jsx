import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Clock() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("session");

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(sessionLength * 60); // Update timeLeft only when paused
    }
  }, [sessionLength]);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setMode("session");

    const audio = document.getElementById("beep");
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          playBeep();
          if (mode === "session") {
            setMode("break");
            return breakLength * 60;
          } else {
            setMode("session");
            return sessionLength * 60;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode, breakLength, sessionLength]);

  const playBeep = () => {
    const audio = document.getElementById("beep");
    if (audio) {
      audio.play().catch(() => {}); // Prevent autoplay errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-150 via-indigo-300 to-purple-150 text-white font-sans">
      <motion.h1
        className="text-5xl font-bold text-yellow-400 mb-8 p-4 bg-opacity-60 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        25 + 5 Clock
      </motion.h1>
      <div className="border-2 border-gray-600 rounded-lg p-8 shadow-2xl bg-gray-800 w-96 text-center backdrop-blur-lg">
        {/* Timer Display */}
        <motion.div
          className="mb-6 p-6 border-4 border-yellow-500 rounded-full"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            key={mode}
            className="text-3xl font-semibold text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {mode === "session" ? "Session" : "Break"}
          </motion.h2>

          <motion.h1
            className="text-7xl font-extrabold text-yellow-400 mt-4"
            key={`${mode}-${timeLeft}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {formatTime(timeLeft)}
          </motion.h1>
        </motion.div>

        {/* Break Length Control */}
        <motion.div
          className="flex justify-between items-center mb-6 p-4 border-2 border-gray-600 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-medium">Break Length</h2>
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
              onClick={() =>
                !isRunning && setBreakLength((prev) => Math.max(prev - 1, 1))
              }
            >
              -
            </button>
            <span className="text-xl">{breakLength}</span>
            <button
              className="bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
              onClick={() =>
                !isRunning && setBreakLength((prev) => Math.min(prev + 1, 60))
              }
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Session Length Control */}
        <motion.div
          className="flex justify-between items-center mb-8 p-4 border-2 border-gray-600 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-medium">Session Length</h2>
          <div className="flex items-center gap-4">
            <button
              className="bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
              onClick={() =>
                !isRunning && setSessionLength((prev) => Math.max(prev - 1, 1))
              }
            >
              -
            </button>
            <span className="text-xl">{sessionLength}</span>
            <button
              className="bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
              onClick={() =>
                !isRunning && setSessionLength((prev) => Math.min(prev + 1, 60))
              }
            >
              +
            </button>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 90, scale: 0.8 }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700"
            onClick={resetTimer}
          >
            Reset
          </motion.button>
        </div>
      </div>

      {/* Beep Sound */}
      <audio
        id="beep"
        src="https://www.myinstants.com/media/sounds/bell.mp3"
      ></audio>
    </div>
  );
}

export default Clock;
