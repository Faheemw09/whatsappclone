import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { useMessages } from "../hooks/useInstantDB"; // Custom hook for fetching messages
import MessageInput from "./MessageInput";
import Message from "./Message";

function ChatWindow() {
  const { state } = useAppContext();
  const { messages, sendMessage } = useMessages(state.selectedContact?.id);
  const [messageText, setMessageText] = useState("");

  const messagesEndRef = useRef(null); // For auto-scrolling to the bottom of messages

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        text: messageText,
        sender: "You",
        timestamp: new Date().toISOString(), // Store timestamp for each message
      };
      sendMessage(newMessage);
      setMessageText("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-green-50 rounded-lg shadow-lg">
      {/* Chat header with contact name */}
      <div className="w-full bg-white p-4 shadow-md rounded-t-lg">
        <h2 className="text-xl font-semibold">
          {state.selectedContact
            ? state.selectedContact.name
            : "Select a contact"}
        </h2>
      </div>

      {/* Messages area with auto-scroll */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Start a conversation!</p>
        ) : (
          messages.map((msg, index) => (
            // Destructure the message object and pass the properties
            <Message
              key={index}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))
        )}

        {/* This empty div ensures the scroll goes to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input area */}
      <MessageInput
        value={messageText}
        onChange={setMessageText}
        onSend={handleSendMessage}
      />
    </div>
  );
}

export default ChatWindow;
