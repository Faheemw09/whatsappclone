import React, { createContext, useEffect, useState } from "react";
import { addContact, getContacts } from "../utils/db";
// import { initDB, getContacts, addContact } from "../utils/db";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const result = await getContacts();
    setContacts(result);
  };

  const handleAddContact = async (contact) => {
    await addContact(contact);
    fetchContacts();
  };

  //   useEffect(() => {
  //     initDB().then(fetchContacts);
  //   }, []);

  return (
    <ContactContext.Provider value={{ contacts, addContact: handleAddContact }}>
      {children}
    </ContactContext.Provider>
  );
};
