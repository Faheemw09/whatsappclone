import React from "react";

function Message({ message }) {
  return (
    <div
      className={`message ${
        message.sender === "You" ? "text-right" : "text-left"
      } mb-4`}
    >
      <div
        className={`message-bubble ${
          message.sender === "You"
            ? "bg-white text-black"
            : "bg-gray-300 text-black"
        } p-3 rounded-lg max-w-xs inline-block`}
      >
        {/* Flex container for message text, timestamp, and sender */}
        <div className="flex flex-col items-start space-y-2">
          {/* Message text */}
          <p className="text-base">{message.text}</p>

          {/* Timestamp on the right */}
          <div className="flex justify-between items-center w-full">
            <span className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            {/* Sender's name */}
            <span className="text-[10px] text-green-600 font-semibold">
              {message.sender}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
