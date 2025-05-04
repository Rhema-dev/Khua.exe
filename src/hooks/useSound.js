// src/hooks/useSound.js
import { useEffect, useRef } from 'react';

const useSound = (src, volume = 1) => {
  const soundRef = useRef(null);

  useEffect(() => {
    soundRef.current = new Audio(src);
    soundRef.current.volume = volume;
  }, [src, volume]);

  const play = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0; // Rewind if already playing
      soundRef.current.play().catch(e => console.log("Audio play blocked:", e));
    }
  };

  return play;
};

export default useSound;