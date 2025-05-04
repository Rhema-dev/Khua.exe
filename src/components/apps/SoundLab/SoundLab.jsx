import { useState, useEffect, useRef } from 'react';
import './SoundLab.css';

export default function SoundLab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [bass, setBass] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const bassEQRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    bassEQRef.current = audioContextRef.current.createBiquadFilter();
    bassEQRef.current.type = 'lowshelf';
    bassEQRef.current.frequency.value = 500;
    gainNodeRef.current = audioContextRef.current.createGain();

    return () => {
      sourceNodeRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, []);

  // Setup audio graph on audioSrc change
  useEffect(() => {
    if (!audioRef.current || !audioContextRef.current) return;

    const reconnect = () => {
      sourceNodeRef.current?.disconnect();

      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceNodeRef.current
        .connect(bassEQRef.current)
        .connect(gainNodeRef.current)
        .connect(audioContextRef.current.destination);

      gainNodeRef.current.gain.value = volume;
      bassEQRef.current.gain.value = bass;
    };

    reconnect();

    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioSrc]);

  // Update gain and bass in real time
  useEffect(() => {
    gainNodeRef.current && (gainNodeRef.current.gain.value = volume);
  }, [volume]);

  useEffect(() => {
    bassEQRef.current && (bassEQRef.current.gain.value = bass);
  }, [bass]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCurrentFile(file);
    setAudioSrc(url);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const togglePlay = async () => {
    if (!audioRef.current || !audioSrc) return;

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="soundlab-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        style={{ display: 'none' }}
      />

      {!audioSrc ? (
        <div className="soundlab-upload">
          <h2>🎵 SoundLab</h2>
          <p>Select an audio file to get started</p>
          <button className="btn" onClick={handleOpenFileDialog}>Upload Audio</button>
        </div>
      ) : (
        <div className="soundlab-player">
          <audio ref={audioRef} src={audioSrc} />
          <div className="soundlab-info">
            <h3>{currentFile?.name}</h3>
          </div>
          <div className="soundlab-controls">
            <button className="btn" onClick={togglePlay}>
              {isPlaying ? '❚❚ Pause' : '▶ Play'}
            </button>
            <button className="btn" onClick={handleOpenFileDialog}>
              Change File
            </button>
          </div>

          <div className="soundlab-slider">
            <label>Progress: {formatTime(currentTime)} / {formatTime(duration)}</label>
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
            />
          </div>

          <div className="soundlab-slider">
            <label>Volume: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>

          {/* <div className="soundlab-slider">
            <label>Bass: {bass} dB</label>
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              value={bass}
              onChange={(e) => setBass(parseInt(e.target.value))}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

// Helper to format time (e.g., 01:23)
function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
