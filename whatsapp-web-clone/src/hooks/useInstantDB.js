import { useState, useEffect } from "react";
import { getMessages, saveMessage } from "../utils/instantdb"; // Import the functions

export function useMessages(contactId) {
  const [messages, setMessages] = useState([]);

  // Fetch messages from IndexedDB
  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(contactId);
      setMessages(fetchedMessages);
    };

    if (contactId) {
      fetchMessages();
    }
  }, [contactId]);

  // Send a message and save it to IndexedDB
  const sendMessage = async (newMessage) => {
    // Check if newMessage is defined and has a valid 'text' property
    if (
      !newMessage ||
      typeof newMessage.text !== "string" ||
      newMessage.text.trim() === ""
    ) {
      console.error("Message text is required and must be a non-empty string");
      return; // Avoid sending an empty or invalid message
    }

    // Ensure the message has all necessary properties (timestamp, sender)
    const messageToSend = {
      ...newMessage,
      timestamp: newMessage.timestamp || Date.now(), // If no timestamp, use the current time
      sender: newMessage.sender || "You", // Default sender if not provided
    };

    try {
      // Save the message to IndexedDB
      await saveMessage(contactId, messageToSend);

      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, messageToSend]);
    } catch (error) {
      console.error("Error saving the message:", error);
    }
  };

  // Get the last message or return a default message if there are no messages
  const lastMessage =
    messages.length > 0
      ? messages[messages.length - 1]
      : { text: "No messages" };

  return { messages, sendMessage, lastMessage };
}
