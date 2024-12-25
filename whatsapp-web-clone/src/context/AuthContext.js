import { useState } from "react";

// Mock API for demo purposes
export const useContact = () => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    // Simulate a user fetching from local storage or an API
    return user || JSON.parse(localStorage.getItem("currentUser"));
  };

  const registerUser = async (userData) => {
    // Simulate a registration API call
    const newUser = {
      ...userData,
      id: Date.now(), // Use a real ID generation logic
      createdAt: new Date(),
    };

    // Save user data to local storage or an API
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);
    return newUser;
  };

  return {
    getUser,
    registerUser,
  };
};
