import React from "react";

const Portfolio = () => {
  const projects = [
    {
      name: "Network Optimization for ABC Corp",
      description:
        "Reduced network latency by 30% through strategic server configurations and firewall optimizations.",
      technologies: ["Cisco", "VMware", "Linux"],
    },
    {
      name: "Cloud Migration for XYZ Inc",
      description:
        "Led migration of on-premise servers to AWS, improving system uptime by 99.9%.",
      technologies: ["AWS", "Docker", "Terraform"],
    },
  ];

  return (
    <div className="py-12 bg-white" id="portfolio">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-gray-800">Portfolio</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600">
                {project.name}
              </h3>
              <p className="mt-4 text-gray-700">{project.description}</p>
              <ul className="mt-4 flex space-x-4">
                {project.technologies.map((tech, i) => (
                  <li
                    key={i}
                    className="text-sm bg-blue-100 text-blue-500 px-2 py-1 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
