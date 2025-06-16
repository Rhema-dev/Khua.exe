import { useState } from "react";
import { FaGlobe, FaImage, FaTimes, FaSearch, FaPhone } from "react-icons/fa";
import ModelViewer from "../3DViewer/3DViewer";
import "./khua.css";

function Khua({ closeKhua }) {
  const [activeRealm, setActiveRealm] = useState("quantum");
  const [selectedProjection, setSelectedProjection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const realms = {
    quantum: {
      name: "Web Projects",
      icon: <FaGlobe />,
      projects: [
        {
          id: 1,
          name: "Rhema",
          url: "https://rhemaa.vercel.app",
          description: "Regular portfolio website",
        },
        {
          id: 2,
          name: "Tutorial Heaven",
          url: "https://tutorialheaven.pages.dev",
          description: "Integrated AI to guide learning",
        },
        {
          id: 3,
          name: "Fluxrware Landing Page",
          url: "https://fluxrware.com",
          description: "Team agency landing page",
        },
        {
          id: 4,
          name: "Rhembow Labs",
          url: "https://rhembowlabs.vercel.app",
          description: "Creative agency page",
        },
      ],
    },
    mobile: {
      name: "Mobile Apps",
      icon: <FaPhone />,
      projects: [
        {
          id: 1,
          name: "MaxiHealthCare",
          url: "https://play.google.com/store/apps/details?id=com.rhema_dev.maxihealthcare&hl=en-US&pli=1",
          description: "Healthcare Company Mobile Application",
        },
      ],
    },
    neon: {
      name: "3D Projects",
      icon: <FaImage />,
      projects: [
        {
          id: 1,
          name: "Quantum Viewer",
          description: "3D reality manipulator",
        },
      ],
    },
  };

  const filteredProjects = realms[activeRealm].projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedProjection) {
    return (
      <div className="khua-fullscreen">
        <div className="khua-toolbar">
          <button
            className="khua-close"
            onClick={() => setSelectedProjection(null)}
          >
            <FaTimes /> Close
          </button>
        </div>
        <div className="khua-projection">
          <h2>{selectedProjection.name}</h2>
          <p>{selectedProjection.description}</p>
          {selectedProjection.url ? (
            <><a href={selectedProjection.url} target="_blank">
                If page does not open here click here to open externally
              </a>
              <iframe
                src={selectedProjection.url}
                title={selectedProjection.name}
                className="khua-iframe-full"
              />
              
            </>
          ) : (
            <ModelViewer />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="khua-container">
      <header className="khua-header">
        <button onClick={closeKhua} className="khua-exit">
          Exit
        </button>
        <div className="khua-realms">
          {Object.entries(realms).map(([key, realm]) => (
            <button
              key={key}
              className={`khua-tab ${activeRealm === key ? "active" : ""}`}
              onClick={() => setActiveRealm(key)}
            >
              {realm.icon} {realm.name}
            </button>
          ))}
        </div>
        <div className="khua-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="khua-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="khua-card"
            onClick={() => setSelectedProjection(project)}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default Khua;
