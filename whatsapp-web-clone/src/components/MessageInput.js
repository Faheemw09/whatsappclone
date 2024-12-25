import React from "react";

function MessageInput({ message, setMessage, handleSend }) {
  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      e.preventDefault(); // Prevent default Enter key behavior (e.g., new line in text area)
      handleSend(); // Trigger the send message function
    }
  };

  return (
    <div className="flex items-center p-2 border-t border-gray-300">
      <input
        type="text"
        className="flex-1 p-2 rounded-lg border border-gray-300"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Add the keypress event
      />
      <button
        onClick={handleSend}
        className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
