import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Add your backend connection here (see backend part below).
  };

  return (
    <div className="py-12 bg-gray-100" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-gray-800">Contact Me</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="w-full p-4 border border-gray-300 rounded"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-4 border border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-4 border border-gray-300 rounded"
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
