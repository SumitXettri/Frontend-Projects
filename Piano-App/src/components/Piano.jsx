import React, { useState, useEffect } from "react";
import Key from "./Key";
import whiteKeys from "../assets/whiteKeys"; // Import white keys array
import blackKeys from "../assets/blackKeys"; // Import black keys array

const Piano = () => {
  useEffect(() => {
    console.log("useEffect triggered");
    const handleKeyPress = (e) => {
      const keyPressed = e.key.toUpperCase();

      console.log("Key Pressed:", keyPressed);

      const whiteKey = whiteKeys.find((key) => key.key === keyPressed);
      if (whiteKey) {
        console.log(`White Key Pressed: ${keyPressed}`);
        const audio = new Audio(whiteKey.sound);
        audio.play();
      }

      const blackKey = blackKeys.find((key) => key.key === keyPressed); // Make sure it's keyPressed and not key.Pressed
      if (blackKey) {
        console.log(`Black Key Pressed: ${keyPressed}`);
        const audio = new Audio(blackKey.sound);
        audio.play();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="piano">
      {/* Rendering white keys */}
      <div className="white-keys">
        {whiteKeys.map((key, index) => (
          <Key
            key={index}
            note={key.note}
            sound={key.sound}
            keyLabel={key.key}
            keyClass="white-key"
          />
        ))}
      </div>

      {/* Rendering Black keys */}
      <div className="black-keys">
        {blackKeys.map((key, index) => (
          <Key
            key={index}
            note={key.note}
            sound={key.sound}
            keyLabel={key.key}
            keyClass="black-key"
          />
        ))}
      </div>
    </div>
  );
};

export default Piano;
