import React from "react";
import { useMessages } from "../hooks/useMessages"; // Import the useMessages hook

function ContactListItem({ contact, isSelected, onSelect }) {
  // Get the last message for this contact
  const { lastMessage } = useMessages(contact.id);

  return (
    <li
      onClick={() => onSelect(contact)}
      className={`flex items-center cursor-pointer p-3 rounded-lg transition bg-teal-50 ${
        isSelected ? "bg-green-200 text-green" : "hover:bg-gray-100"
      }`}
    >
      <div className="flex-1 ">
        <h3 className="font-semibold">{contact.name}</h3>
        <p className="text-sm text-gray-500">
          {lastMessage.text || "No messages"} {/* Display last message */}
        </p>
      </div>
    </li>
  );
}

export default ContactListItem;
