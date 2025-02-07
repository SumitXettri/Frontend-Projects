import React, { useEffect, useState } from "react";
import DrumPad from "./DrumPad"; // Import DrumPad

const App = () => {
  const [currentPad, setCurrentPad] = useState(null);
  const [volume, setVolume] = useState(1);
  const [power, setPower] = useState(true);
  const [currentBank, setCurrentBank] = useState("drumpads");

  const togglePower = () => {
    setPower((prev) => !prev);
    setCurrentPad(null);
  };

  const toggleBank = () => {
    setCurrentBank((prevBank) =>
      prevBank === "drumpads" ? "drumpads2" : "drumpads"
    );
    setCurrentPad(null);
  };

  const adjustVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
  };

  useEffect(() => {
    const audios = document.querySelectorAll(".clip");
    audios.forEach((audio) => (audio.volume = volume));
  }, [volume, currentBank]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!power) return;

      const key = e.key.toUpperCase();
      const audioElement = document.getElementById(key);

      if (audioElement) {
        const parentPad = audioElement.parentNode;
        parentPad.classList.add("active");
        audioElement.currentTime = 0;
        audioElement.play();
        setCurrentPad(parentPad.id);
        setTimeout(() => parentPad.classList.remove("active"), 200);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [power]);

  const currentDrumPads = currentBank === "drumpads" ? drumpads : drumpads2;

  return (
    <div id="drum-machine">
      <div className="main-content">
        <h1 className="text-center my-4">Drum Machine</h1>
        <div className="drum-pad-container">
          {currentDrumPads.map((pad) => (
            <div className="col-4 text-center" key={pad.id}>
              <DrumPad
                keyTrigger={pad.keyTrigger}
                id={pad.id}
                url={pad.url}
                setCurrentPad={setCurrentPad}
                power={power}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Right compartment */}
      <div className="right-compartment">
        <div className="switch-button">
          <input
            id="checkboxInput"
            type="checkbox"
            checked={power}
            onChange={togglePower}
          />
          <label className="toggleSwitch" htmlFor="checkboxInput">
            <svg
              className="slider"
              viewBox="0 0 512 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
            </svg>
          </label>
          <h3>Power</h3>
        </div>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.1"
          onChange={adjustVolume}
        />
        <h3>Volume</h3>
        <div id="display">
          {power ? currentPad || "Press a Key" : "Power Off"}
        </div>
        <button className="bank-button" onClick={toggleBank}>
          Change Bank
        </button>
        <span className="bank-name">
          {currentBank === "drumpads" ? "First Bank" : "Second Bank"}
        </span>
      </div>
      <div className="logo">
        <i className="fa-solid fa-drum fa-2xl"></i>
        <h4>Drum</h4>
      </div>
    </div>
  );
};

export default App; // Export the App component

// Drum pads data
const drumpads = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const drumpads2 = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];
