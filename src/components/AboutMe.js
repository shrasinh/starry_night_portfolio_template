'use client';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function AboutMe ()
{
    return (
        <section id="about-me" className="parallax fade-in-out text-center">
            <motion.h1
                className="text-5xl font-extrabold flex justify-center"
            >
                { "About Me".split( "" ).map( ( letter, index ) => (
                    <motion.span
                        key={ index }
                        initial={ { opacity: 0, rotateX: 90 } } // Start with rotation on X-axis
                        animate={ { opacity: 1, rotateX: 0 } } // End with no rotation
                        transition={ {
                            duration: 1,
                            delay: index * 0.1, // Stagger animation for each letter
                        } }
                    >
                        { letter === " " ? "\u00A0" : letter } {/* Maintain spaces */ }
                    </motion.span>
                ) ) }
            </motion.h1>

            <p className="mt-4 lg:mx-40 mx-4 text-lg text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <div className="mt-6 flex gap-4 items-center justify-center">
                <div className="relative group">
                    <a
                        href="mailto:your.email@example.com"
                        className="text-gray-300 hover:text-white glow-icon"
                        aria-label="Email"
                    >
                        <FaEnvelope className="text-2xl" />
                    </a>
                    <div className="absolute icon-name bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 text-sm text-white bg-gray-800 rounded-lg">
                        Email
                    </div>
                </div>
                <div className="relative group">
                    <a
                        href="https://www.linkedin.com/in/yourprofile/"
                        className="text-gray-300 hover:text-white glow-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <div className="absolute icon-name bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 text-sm text-white bg-gray-800 rounded-lg">
                        LinkedIn
                    </div>
                </div>
                <div className="relative group">
                    <a
                        href="https://github.com/yourusername"
                        className="text-gray-300 hover:text-white glow-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub className="text-2xl" />
                    </a>
                    <div className="absolute icon-name bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block px-2 py-1 text-sm text-white bg-gray-800 rounded-lg">
                        GitHub
                    </div>
                </div>
            </div>
        </section>
    );
}
