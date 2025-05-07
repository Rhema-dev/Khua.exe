// src/components/AppWrapper.jsx
import { useState } from 'react';
import Window from './Window'; // Your existing Window component

export default function AppWrapper({ id, title, url, onClose, onMinimize, isFocused, onFocus }) {
  const [loading, setLoading] = useState(true);

  return (
    <Window
      id={id}
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      isFocused={isFocused}
      onFocus={onFocus}
    >
      <div className="app-container">
        {loading && (
          <div className="app-loading">
            <div className="spinner"></div>
            <p>Loading {title}...</p>
          </div>
        )}
        <iframe 
          src={url}
          onLoad={() => setLoading(false)}
          className={`app-iframe ${loading ? 'hidden' : ''}`}
          title={title}
          allow="fullscreen"
        />
      </div>
    </Window>
  );
}