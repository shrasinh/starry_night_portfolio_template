'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs, FaJava } from 'react-icons/fa'; // Import your icons

const projects = [
    {
        title: 'Project One',
        description: 'A description of Project One.',
        link: 'https://example.com/project1',
        skills: [
            { name: 'JavaScript', icon: <FaJava className="text-3xl" /> },
            { name: 'React', icon: <FaReact className="text-3xl" /> },
            { name: 'CSS', icon: <FaReact className="text-3xl" /> } // Example; replace with actual CSS icon
        ],
        moreInfo: 'Detailed information about Project One.',
    },
    {
        title: 'Project Two',
        description: 'A description of Project Two.',
        link: 'https://example.com/project2',
        skills: [
            { name: 'Python', icon: <FaPython className="text-3xl" /> },
        ],
        moreInfo: 'Detailed information about Project Two.',
    },
    {
        title: 'Project Three',
        description: 'A description of Project Three.',
        link: 'https://example.com/project3',
        skills: [
            { name: 'JavaScript', icon: <FaJava className="text-3xl" /> },
            { name: 'Node.js', icon: <FaNodeJs className="text-3xl" /> },
            { name: 'Express', icon: <FaNodeJs className="text-3xl" /> } // Example; replace with actual Express icon
        ],
        moreInfo: 'Detailed information about Project Three.',
    },
    // Add more projects as needed
];

export default function SkillsChart ( { activeSection } )
{
    const [ selectedProject, setSelectedProject ] = useState( null );

    const handleProjectClick = ( project ) =>
    {
        setSelectedProject( project );
    };

    const handleCloseModal = () =>
    {
        setSelectedProject( null );
    };

    useEffect( () =>
    {
        if ( activeSection !== 'skills' )
        {
            handleCloseModal(); // Close modal if active section changes away from "skills"
        }
    }, [ activeSection ] );

    return (
        <section id="skills" className="parallax fade-in-out text-center">
            <motion.h1
                className="text-4xl font-extrabold flex justify-center mb-8"
            >
                { "Skills & Projects".split( "" ).map( ( letter, index ) => (
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

            <div className="flex flex-wrap">
                { projects.map( ( project, index ) => (
                    <motion.div
                        key={ index }
                        className="relative md:p-6 pt-6 pb-6 mx-auto transition-transform transform hover:scale-105 cursor-pointer w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                        onClick={ () => handleProjectClick( project ) }
                        whileHover={ { scale: 1.05 } }
                        whileTap={ { scale: 0.95 } }
                    >
                        <h3 className="text-xl font-semibold">{ project.title }</h3>
                        <p className="text-gray-400 mt-2">{ project.description }</p>
                        <div className='mt-3'>
                            <a
                                href={ project.link }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline-animation hover:text-blue-500"
                                onClick={ ( e ) => e.stopPropagation() }
                            >
                                View Project
                            </a>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3 items-center justify-center">
                            { project.skills.map( ( skill, skillIndex ) => (
                                <div key={ skillIndex } className="relative group flex items-center justify-center">
                                    <div
                                        className="w-12 h-12 text-gray-400 group-hover:text-current"
                                    >
                                        { skill.icon }
                                    </div>
                                    <span className="absolute icon-name bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs bg-gray-800 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        { skill.name }
                                    </span>
                                </div>
                            ) ) }
                        </div>
                    </motion.div>
                ) ) }
            </div>

            { selectedProject && (
                <motion.div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
                    initial={ { opacity: 0 } }
                    animate={ { opacity: 1 } }
                    exit={ { opacity: 0 } }
                    onClick={ handleCloseModal }
                >
                    <motion.div
                        className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full relative"
                        onClick={ ( e ) => e.stopPropagation() }
                        initial={ { scale: 0.9 } }
                        animate={ { scale: 1 } }
                        exit={ { scale: 0.9 } }
                    >
                        <button
                            onClick={ handleCloseModal }
                            className="absolute top-2 right-2 p-3 text-gray-400 transition-transform transform hover:scale-110 hover:text-gray-200 rounded-full focus:outline-none lg:p-4 lg:text-2xl"
                        >
                            ✖
                        </button>
                        <h3 className="text-2xl font-semibold mb-4">{ selectedProject.title }</h3>
                        <p className="mb-4 text-gray-300">{ selectedProject.moreInfo }</p>
                        <a
                            href={ selectedProject.link }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View Full Project
                        </a>
                    </motion.div>
                </motion.div>
            ) }
        </section>
    );
}
