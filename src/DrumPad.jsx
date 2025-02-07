import React, { useState, useEffect } from "react";

const DrumPad = ({ keyTrigger, id, url, setCurrentPad, power }) => {
  const [isActive, setIsActive] = useState(false);

  const playDrum = () => {
    if (!power) return;
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
    setCurrentPad(id);
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200);
  };

  return (
    <div
      id={id}
      className={`drum-pad ${isActive ? "active" : ""}`}
      onClick={playDrum}
      aria-label={`Play ${id}`}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </div>
  );
};

export default DrumPad; // Export DrumPad component
