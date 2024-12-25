import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { saveContact } from "../utils/instantdb";

const AddContactForm = ({ onContactAdded }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { state } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Both fields are required.");
      return;
    }

    const newContact = { name, phone };

    onContactAdded(newContact); // Update context and save the new contact

    setName("");
    setPhone("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Contact</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          placeholder="Enter name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded"
          placeholder="Enter phone number"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-400 text-white p-2 rounded hover:bg-blue-600"
      >
        Save Contact
      </button>
    </form>
  );
};

export default AddContactForm;
