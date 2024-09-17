import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600">Kobe Wijnants</h1>
      <p className="text-xl mt-4 text-gray-700">
        Systems & Network Administrator
      </p>
      <p className="text-md mt-2 text-gray-500">
        Securing and Optimizing Complex IT Infrastructures
      </p>
      <a href="#contact" className="mt-6 text-blue-500 underline">
        Contact Me
      </a>
    </div>
  );
};

export default Home;
