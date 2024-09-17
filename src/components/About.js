import React from "react";

const About = () => {
  return (
    <div className="py-12 bg-white" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-gray-800">About Me</h2>
        <p className="mt-6 text-gray-600 leading-relaxed">
          I am a certified Systems & Network Administrator with over 10 years of
          experience in IT infrastructure, network security, and cloud
          environments. I've worked across a range of industries, from
          healthcare to finance, deploying optimized and secure systems to
          reduce downtime and increase network performance.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Certified in Cisco CCNA, AWS Solutions Architect, and Microsoft Azure.
          I'm passionate about staying up to date with the latest trends in
          cybersecurity and cloud computing.
        </p>
      </div>
    </div>
  );
};

export default About;
