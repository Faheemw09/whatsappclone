import React, { useState, useEffect } from "react";
import { db, generateId } from "../utils/db";

const ChatWindow = ({ currentUser, selectedContact }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Fetch all messages (assuming you fetch the full list, or adjust as necessary)
    db.subscribeQuery({ messages: {} }, (resp) => {
      console.log(resp);
      if (resp.data?.messages) {
        // Filter messages based on senderId and receiverId
        const filteredMessages = resp.data.messages.filter(
          (msg) =>
            (msg.senderId === currentUser.id &&
              msg.receiverId === selectedContact.id) ||
            (msg.senderId === selectedContact.id &&
              msg.receiverId === currentUser.id)
        );

        // Sort the filtered messages based on timestamp
        const sortedMessages = filteredMessages.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setMessages(sortedMessages);
      }
    });

    return () => {
      // Cleanup code if necessary (e.g., unsubscribeQuery)
    };
  }, [currentUser, selectedContact]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      db.transact(
        db.tx.messages[generateId()].update({
          senderId: currentUser.id,
          receiverId: selectedContact.id,
          text: inputValue,
          timestamp: Date.now(),
        })
      );
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSendMessage();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 12:00 for 0 hours
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header: Display selected user's name */}
      <div className="sticky top-0 z-10 flex justify-between items-center p-3 bg-green-200">
        <div className="flex-1 text-right">
          <p className="text-black text-[30px]">{selectedContact?.name}</p>
        </div>
        <div className="flex-1">
          {/* <p className="text-black text-[30px]">{currentUser?.name}</p> */}
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-green-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.senderId === currentUser.id ? "flex-row-reverse" : "flex-row"
            } flex`}
          >
            <div
              className={`flex flex-col items-${
                msg.senderId === currentUser.id ? "end" : "start"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  msg.senderId === currentUser.id
                    ? "bg-green-200 text-black"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex items-center space-x-2">
        <input
          className="flex-1 border-2 border-green-600 px-4 py-2 rounded-full"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
