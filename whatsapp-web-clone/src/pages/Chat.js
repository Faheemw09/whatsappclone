import React, { useState } from "react";
import { useAuth } from "../context/AppContext";
import ContactList from "../components/ContactList";
import ChatWindow from "../components/ChatWindow";

const Chat = () => {
  const { currentUser } = useAuth();
  const [selectedContact, setSelectedContact] = useState(null);

  if (!currentUser) {
    return <div>Please log in to access the chat.</div>;
  }

  return (
    <div className="flex h-screen">
      <ContactList
        currentUser={currentUser}
        onContactClick={(contact) => setSelectedContact(contact)}
      />
      {selectedContact ? (
        <ChatWindow
          selectedContact={selectedContact}
          currentUser={currentUser}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <h2>Select a contact to start chatting.</h2>
        </div>
      )}
    </div>
  );
};

export default Chat;
