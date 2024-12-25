import React, { useState, useEffect } from "react";
import { db, deleteAllUsers } from "./utils/db";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import Registration from "./components/Registration";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");

    if (savedUserId) {
      const unsubscribe = db.subscribeQuery(
        {
          users: {
            $filter: { id: savedUserId },
          },
        },
        (resp) => {
          if (resp.data?.users?.length > 0) {
            setCurrentUser(resp.data.users[0]);
          }
        }
      );

      return () => unsubscribe();
    }
  }, []);

  const handleProfileCreated = (user) => {
    setCurrentUser(user);
    localStorage.setItem("userId", user.id);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  if (!currentUser) {
    return <Registration onProfileCreated={handleProfileCreated} />;
  }

  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r p-1">
        <ContactList
          currentUser={currentUser} // Passing currentUser to ContactList
          onSelectContact={handleSelectContact}
        />
      </div>

      <div className="w-2/3">
        {selectedContact ? (
          <ChatWindow
            currentUser={currentUser}
            selectedContact={selectedContact}
          />
        ) : (
          <p className="text-center text-gray-500 mt-8">
            Select a contact to chat
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
