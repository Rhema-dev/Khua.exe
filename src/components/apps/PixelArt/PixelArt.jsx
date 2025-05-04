import { useState } from 'react';
import './PixelArt.css';

export default function PixelArt() {
  const [grid, setGrid] = useState(Array(16 * 16).fill('#FFFFFF'));
  const [color, setColor] = useState('#FF0000');

  const handlePixelClick = (index) => {
    const newGrid = [...grid];
    newGrid[index] = color;
    setGrid(newGrid);
  };

  return (
    <div className='window'>
      <div className="window-content">
        <div className="pixel-grid">
          {grid.map((pixelColor, index) => (
            <div
              key={index}
              style={{ backgroundColor: pixelColor }}
              onClick={() => handlePixelClick(index)}
            />
          ))}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button 
          className="export-btn"
          onClick={() => alert('Redirect to game portfolio!')}
        >
          Export
        </button>
      </div>
    </div>
  );
}