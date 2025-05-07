import { useEffect, useRef } from 'react';
import './StaticEffect.css';

export default function StaticEffect() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.01; // Set volume to 10%
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="static-video"
      autoPlay
      loop
      playsInline
      muted
      src="/static_noise.mp4" // place this file in your public folder
    />
  );
}
