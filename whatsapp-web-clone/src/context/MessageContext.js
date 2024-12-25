import React, { createContext, useState, useEffect } from "react";
import { initDB, getMessages, addMessage } from "../utils/db";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (contactId) => {
    const result = await getMessages(contactId);
    setMessages(result);
  };

  const handleAddMessage = async (contactId, text, sender) => {
    const newMessage = {
      id: Date.now(),
      contactId,
      text,
      sender,
      timestamp: new Date(),
    };
    await addMessage(newMessage);
    fetchMessages(contactId);
  };

  //   useEffect(() => {
  //     initDB();
  //   }, []);

  return (
    <MessageContext.Provider
      value={{ messages, addMessage: handleAddMessage, fetchMessages }}
    >
      {children}
    </MessageContext.Provider>
  );
};
