import { motion } from "framer-motion";
import { FaFileDownload, FaLinkedin, FaGithub } from "react-icons/fa";
import "./About.css";

export default function About() {
  const skills = [
    "JavaScript (ES6+)",
    "React",
    "React Native",
    "Node.js/Express",
    "MongoDB",
    "Three.js",
    "Python",
    "C++",
    "Blender3D",
    "After Effects",
    "Unreal Engine 5",
    "Premiere Pro",
    "FL Studio",
  ];

  const experiences = [
    {
      role: "FrontEnd Web Developer",
      company: "Fluxrware Tech.",
      period: "2024-Present",
    },
    {
      role: "FrontEnd Mobile Developer",
      company: "MaxiHealthCare",
      period: "2024-2025",
    },

    {
      role: "3D Artist",
      company: "Rhembow Labs",
      period: "2024-Present",
    },
    {
      role: "Motion Designer",
      company: "Rhembow Labs",
      period: "2024-Present",
    },
    {
      role: "Graphic Designer",
      company: "Rhembow Labs",
      period: "2024-Present",
    },
    {
      role: "Helpdesk Technician, Network Admin Intern",
      company: "Nigerian gas marketing limited",
      period: "2023",
    },
  ];

  const hobbies = [
    "Coding",
    "Electronic Music Production",
    "Editing montages",
    "Streaming",
    "Gaming",
    "3D Modeling",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="about-container"
    >
      <div className="about-content">
        {/* Left Column */}
        <div className="about-left-col">
          <motion.div whileHover={{ scale: 1.02 }} className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">R</div>
              <div className="profile-info">
                <h2 className="profile-name">Rhema Emmanuel-Great Oshiokhua (Khua)</h2>
                <p className="profile-title">Fullstack Creative Developer</p>
              </div>
            </div>

            <div className="contact-info">
              <h3 className="contact-title">Contact</h3>
              <p className="contact-text">emmarhema20000@gmail.com</p>
              <p className="contact-text">+234 704 1099 662</p>

              {/* <div className="social-links">
                <a href="#" className="social-link">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="social-link">
                  <FaGithub size={20} />
                </a>
              </div> */}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="hobbies-card">
            <h3 className="hobbies-title">Hobbies</h3>
            <div className="hobbies-list">
              {hobbies.map((hobby, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="hobby-tag"
                >
                  {hobby}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="about-right-col">
          <motion.div whileHover={{ scale: 1.01 }} className="about-card">
            <h2 className="about-title">About Me</h2>
            <p className="about-text">
              Creative fullstack developer with expertise in 3D art, motion
              graphics, and sound design. Passionate about building immersive
              digital experiences that combine technical excellence with
              artistic vision.
            </p>
            <p className="about-text">
              With 2+ years of experience across multiple disciplines, I bridge
              the gap between development and design to create cohesive,
              visually stunning applications.
            </p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="skills-card">
            <div className="skills-header">
              <h2 className="skills-title">Skills</h2>
            </div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="skill-tag"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="experience-card">
            <h2 className="experience-title">Experience</h2>
            <div className="experience-list">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="experience-item"
                >
                  <h3 className="experience-role">{exp.role}</h3>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-period">{exp.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/cv.pdf"
            download
            className="download-btn"
          >
            <FaFileDownload className="download-icon" />
            Download Resume
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
