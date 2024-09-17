import React from "react";

const Skills = () => {
  const skills = [
    "Network Infrastructure Design",
    "System Monitoring & Optimization",
    "Virtualization & Cloud Computing",
    "Security Auditing & Penetration Testing",
    "Disaster Recovery Planning & Backup Solutions",
  ];

  return (
    <div className="py-12 bg-gray-100" id="skills">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-gray-800">Skills</h2>
        <ul className="mt-6">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="text-gray-700 text-lg leading-relaxed mt-2"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;
