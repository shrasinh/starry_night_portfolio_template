import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaVuejs, FaBootstrap, FaGithub } from 'react-icons/fa';
import { SiFlask, SiCelery, SiRedis, SiNumpy, SiPandas, SiScikitlearn, SiPlotly, SiOllama } from 'react-icons/si';

const projects = [
  {
    title: 'Project One',
    description: 'Description for project one',
    link: 'https://github.com/yourname/repo',
    skills: [
      { name: 'Flask', icon: <SiFlask className="text-3xl" /> },
      { name: 'Vue.js', icon: <FaVuejs className="text-3xl" /> },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-3xl" /> },
      { name: 'Celery', icon: <SiCelery className="text-3xl" /> },
      { name: 'Redis', icon: <SiRedis className="text-3xl" /> },
    ],
    structure: 'Individual Project',
    achievement: 'achievement for project 1',
    moreInfo: `
    Key Features:
    - point 1
    - point 2
    - point 3
    `,
  },
  {
    title: 'Project Two',
    description: 'Description for project two',
    link: 'https://github.com/yourname/repo2',
    skills: [
      { name: 'Flask', icon: <SiFlask className="text-3xl" /> },
      { name: 'Vue.js', icon: <FaVuejs className="text-3xl" /> },
      { name: 'Bootstrap', icon: <FaBootstrap className="text-3xl" /> },
      { name: 'GitHub', icon: <FaGithub className="text-3xl" /> },
      { name: 'Llama', icon: <SiOllama className="text-3xl" /> },
    ],
    structure: 'Group project',
    achievement: 'achievement for project 2',
    moreInfo: `
    Key Features:
    - point 1
    - point 2
    - point 3
    `,
  },
  {
    title: 'Project Three',
    description: 'Description for project three',
    link: 'https://github.com/yourname/repo3',
    skills: [
      { name: 'NumPy', icon: <SiNumpy className="text-3xl" /> },
      { name: 'Pandas', icon: <SiPandas className="text-3xl" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn className="text-3xl" /> },
      { name: 'Plotly', icon: <SiPlotly className="text-3xl" /> },
    ],
    structure: 'Competition Entry',
    achievement: 'achievement for project 3',
    moreInfo: `
    Project Highlights:
    - point 1
    - point 2
    - point 3
    `,
  },
];

export default function SkillsChart({ activeSection }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (activeSection !== 'skills') {
      handleCloseModal();
    }
  }, [activeSection]);

  return (
    <section id="skills" className="parallax fade-in-out text-center">
      <motion.h1
        className="text-5xl font-extrabold flex justify-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        {"Skills & Projects".split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
          >
            {letter === " " ? "\u2002" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative p-6 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-800 w-full md:w-2/3 lg:w-2/5 xl:w-1/3"
            onClick={() => handleProjectClick(project)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="mb-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-animation hover:text-blue-500"
                onClick={(e) => e.stopPropagation()}
              >
                View Project
              </a>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {project.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="group relative">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-full text-gray-300 group-hover:text-white group-hover:bg-gray-600 transition-all duration-200">
                    {skill.icon}
                  </div>
                  <span className="absolute icon-name bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs bg-gray-900 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
              aria-label="Close modal"
            >
              ✖
            </button>
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 inline-block mb-4"
              >
                View Full Project
              </a>
              <p className="mb-2 text-gray-300"><strong className="text-white">Project Type:</strong> {selectedProject.structure}</p>
              <p className="mb-4 text-gray-300"><strong className="text-white">Achievement:</strong> {selectedProject.achievement}</p>
              <div className="mb-4 text-gray-300 whitespace-pre-line">{selectedProject.moreInfo}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

