import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectShowcase() {
  const projects = [
    { title: 'Project 1', description: 'This is project 1' },
    { title: 'Project 2', description: 'This is project 2' },
    // Add more projects here
  ];

  return (
    <div className="project-showcase">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}

export default ProjectShowcase;
