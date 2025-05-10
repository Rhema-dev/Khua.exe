import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaImage,
  FaVideo,
  FaGamepad,
  FaMusic,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEllipsisH,
  FaGlobe,
} from "react-icons/fa";
import ProjectsWeb from "./ProjectsWeb";
import ModelViewer from "../3DViewer/3DViewer";
import Projects3D from "./Projects3D";
import ProjectsMotion from "./ProjectsMotion";
import ProjectsVideo from "./ProjectsVideo";
import ProjectsGame from "./ProjectsGame";
import ProjectsSound from "./ProjectsSound";
import "./khua.css";

export default function KhuaApp() {
  const [activeTab, setActiveTab] = useState("3d");

  const tabs = [
    { id: "web", label: "Web", icon: <FaGlobe /> },
    { id: "3d", label: "3D Art", icon: <FaImage /> },
    // { id: "motion", label: "Motion Graphics", icon: <FaVideo /> },
    // { id: "video", label: "Video Editing", icon: <FaVideo /> },
    // { id: "game", label: "Game Dev", icon: <FaGamepad /> },
    // { id: "sound", label: "Sound Design", icon: <FaMusic /> },
  ];

  const projects = {
    web: [
      {
        id: 1,
        name: "PortfolioSite.react",
        type: "web",
        url: "https://khua-exe.pages.dev",
      },
      {
        id: 2,
        name: "Wiki.test",
        type: "web",
        url: "https://en.wikipedia.org/wiki/Main_Page",
      },
      {
        id: 3,
        name: "code.test",
        type: "web",
        url: "https://codepen.io/team/codepen/embed/preview/PNaGbb",
      },
    ],

    "3d": [
      { id: 1, name: "Open Model Viewer", type: "3d" },
    ],
    motion: [
      { id: 1, name: "BrandIdent.aep", type: "motion" },
      { id: 2, name: "Explainer.aep", type: "motion" },
      { id: 3, name: "Titles.aep", type: "motion" },
    ],
    video: [
      { id: 1, name: "ShortFilm.prproj", type: "video" },
      { id: 2, name: "MusicVideo.prproj", type: "video" },
      { id: 3, name: "Corporate.drp", type: "video" },
    ],
    game: [
      {
        id: 1,
        name: "PortfolioSite.react",
        type: "web",
        url: "https://khua-exe.pages.dev",
      },
      {
        id: 2,
        name: "EcommerceApp.next",
        type: "web",
        url: "https://en.wikipedia.org/wiki/Main_Page",
      },
      {
        id: 3,
        name: "BlogPlatform.vue",
        type: "web",
        url: "https://codepen.io/team/codepen/embed/preview/PNaGbb",
      },
    ],
    sound: [
      { id: 1, name: "FilmScore.logicx", type: "sound" },
      { id: 2, name: "GameSFX.fmod", type: "sound" },
      { id: 3, name: "Album.als", type: "sound" },
    ],
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const renderContent = () => {
    if (selectedFile) {
      switch (selectedFile.type) {
        case "web":
          return selectedFile.url ? (
            <div className="iframe-wrapper">
              <iframe
                src={selectedFile.url}
                title={selectedFile.name}
                // frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          ) : (
            <div className="empty-state">
              No URL provided for this web project.
            </div>
          );

        case "3d":
          return <ModelViewer />;
        case "motion":
          return <ProjectsMotion />;
        case "video":
          return <ProjectsVideo />;
        case "game":
          return selectedFile.url ? (
            <div className="iframe-wrapper">
              <iframe
                src={selectedFile.url}
                title={selectedFile.name}
                // frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          ) : (
            <div className="empty-state">
              No URL provided for this web project.
            </div>
          );
        case "sound":
          return <ProjectsSound />;
        default:
          return <div className="empty-state">Select a file to view</div>;
      }
    }
    return <div className="empty-state">Select a file to view</div>;
  };

  return (
    <div className="file-explorer">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-title">Projects</div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`sidebar-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedFile(null);
              }}
            >
              <span className="sidebar-icon">
                {activeTab === tab.id ? <FaFolderOpen /> : <FaFolder />}
              </span>
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-area">
        {/* Toolbar */}
        <div className="toolbar">
          <button className="toolbar-button">
            <FaChevronLeft size={12} />
          </button>
          <button className="toolbar-button">
            <FaChevronRight size={12} />
          </button>
          <div style={{ flex: 1 }}></div>
          <div className="search-box">
            <FaSearch size={12} />
            <input type="text" placeholder="Search projects..." />
          </div>
          <button className="toolbar-button">
            <FaEllipsisH size={12} />
          </button>
        </div>

        {/* File Grid or Content */}
        {!selectedFile ? (
          <div className="file-grid">
            {projects[activeTab].map((file) => (
              <div
                key={file.id}
                className="file-item"
                onClick={() => setSelectedFile(file)}
              >
                <div className="file-icon">
                  {tabs.find((t) => t.id === activeTab)?.icon || <FaFileAlt />}
                </div>
                <div className="file-name">{file.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="file-content">
            {renderContent()}
            <button
              className="back-button"
              onClick={() => setSelectedFile(null)}
            >
              ← Back to files
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
