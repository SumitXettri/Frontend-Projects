import React from "react";

const Key = ({ note, keyClass, sound, keyLabel }) => {
  const handlePlaySound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div className={`key ${keyClass}`} onClick={handlePlaySound}>
      {keyLabel}
    </div>
  );
};

export default Key;
