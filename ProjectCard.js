import React from 'react';

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="project-card" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      {isHovered && (
        <div className="hover-effect">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
