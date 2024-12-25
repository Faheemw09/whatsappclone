import React, { useState, useEffect } from "react";
import { db } from "../utils/db";

const ContactList = ({ currentUser, onSelectContact }) => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    const unsubscribe = db.subscribeQuery(
      {
        users: {},
      },
      (resp) => {
        if (resp.data && Array.isArray(resp.data.users)) {
          const filteredContacts = resp.data.users.filter(
            (el) => el.id !== currentUser.id
          );
          setContacts(filteredContacts);
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribeMessages = db.subscribeQuery(
      {
        messages: {},
      },
      (resp) => {
        if (resp.data?.messages) {
          const userMessages = resp.data.messages.filter(
            (msg) =>
              msg.senderId === currentUser.id ||
              msg.receiverId === currentUser.id
          );

          const sortedMessages = userMessages.sort(
            (a, b) => b.timestamp - a.timestamp
          );
          setMessages(sortedMessages);

          const newUnreadMessages = {};
          userMessages.forEach((msg) => {
            if (
              msg.receiverId === currentUser.id &&
              msg.senderId !== currentUser.id
            ) {
              if (!newUnreadMessages[msg.senderId]) {
                newUnreadMessages[msg.senderId] = true;
              }
            }
          });
          setUnreadMessages(newUnreadMessages);
        }
      }
    );

    return () => unsubscribeMessages();
  }, [currentUser]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    onSelectContact(contact);

    const updatedUnreadMessages = { ...unreadMessages };
    delete updatedUnreadMessages[contact.id];
    setUnreadMessages(updatedUnreadMessages);
  };

  const getLastMessage = (contact) => {
    const lastMessage = messages.find(
      (msg) =>
        (msg.senderId === contact.id && msg.receiverId === currentUser.id) ||
        (msg.receiverId === contact.id && msg.senderId === currentUser.id)
    );
    return lastMessage ? lastMessage.text : "No message yet";
  };

  const getSortedContacts = () => {
    return contacts
      .map((contact) => {
        const lastMessage = messages.find(
          (msg) =>
            (msg.senderId === contact.id &&
              msg.receiverId === currentUser.id) ||
            (msg.receiverId === contact.id && msg.senderId === currentUser.id)
        );
        return {
          ...contact,
          lastMessageTimestamp: lastMessage ? lastMessage.timestamp : 0,
        };
      })
      .sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
  };

  const sortedContacts = getSortedContacts();

  return (
    <div className="space-y-4 h-full bg-rose-100">
      <div className="sticky top-0 z-10 flex items-center space-x-3 p-3 bg-green-200 text-center h-[60px]">
        <div className="flex-1">
          <p className="text-black text-[30px]">{currentUser?.name}</p>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-100px)] p-1 custom-scrollbar">
        {sortedContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center space-x-3 p-3 ${
              selectedContact?.id === contact.id
                ? "bg-pink-50 text-black"
                : unreadMessages[contact.id]
                ? "bg-rose-100 text-black"
                : "bg-white-200 text-black hover:bg-pink-50"
            }`}
            onClick={() => handleSelectContact(contact)}
          >
            <div className="flex-1 h-12 flex items-center justify-start">
              <p className="text-[20px] font-semibold">{contact.name}</p>
            </div>
            <div className="text-sm text-gray-500">
              {getLastMessage(contact)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
