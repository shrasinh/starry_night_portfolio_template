'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function AboutMe() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const socialLinks = [
    {
      href: "mailto:yourname@gmail.com",
      icon: FaEnvelope,
      label: "Email",
      tooltip: "yourname@gmail.com"
    },
    {
      href: "https://www.linkedin.com/in/yourname",
      icon: FaLinkedin,
      label: "LinkedIn",
      tooltip: "linkedin.com/in/yourname"
    },
    {
      href: "https://github.com/yourname",
      icon: FaGithub,
      label: "GitHub",
      tooltip: "github.com/yourname"
    }
  ];

  return (
    <section id="about-me" className="parallax fade-in-out text-center">
      
        <motion.h1
        className="text-5xl font-extrabold flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
      >
        {"About Me".split("").map((letter, index) => (
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

        <motion.div
          className="space-y-6 mt-4 lg:mx-40 mx-4"
          variants={containerVariants}
        >
          <motion.p 
            className="text-xl text-gray-300 leading-relaxed text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            I am <span className="text-purple-400 font-semibold">Your Name</span>, 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </motion.p>

          <motion.p 
            className="text-lg text-gray-400 leading-relaxed text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-8 flex gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={link.label}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={link.href}
                className="block p-3 rounded-full bg-gray-800 hover:bg-gray-700 glow-icon transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon/>
              </a>
              <div className="absolute icon-name bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs bg-gray-900 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {link.tooltip}
              </div>
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
};