import React, { useState } from "react";
import { db, generateId } from "../utils/db";

const Registration = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill out all fields.");
      return;
    }

    const userId = generateId();

    try {
      // Add user to the database
      await db.transact(
        db.tx.users[userId].update({
          ...formData,
          createdAt: new Date(),
        })
      );
      // Pass the created user data to the parent component
      onProfileCreated({ id: userId, ...formData });
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">
          Set Up Your Account
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-400 text-white font-bold py-3 px-4 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default Registration;
