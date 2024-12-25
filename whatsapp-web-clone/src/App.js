import React, { useEffect, useState, useRef } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import { AppProvider, useAppContext } from "./context/AppContext";
import {
  getContacts,
  saveContact,
  deleteAllDataWithConfirmation,
} from "./utils/instantdb";
import AddContactForm from "./components/AddContactForm";
import "./index.css";

function App() {
  const { state, dispatch } = useAppContext();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const contactsFetched = useRef(false); // To prevent double fetch on refresh

  // Function to toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Fetch contacts from IndexedDB when the component mounts
  useEffect(() => {
    const fetchContactsFromDB = async () => {
      const contacts = await getContacts();

      // If contacts are fetched from IndexedDB and they are not yet in state
      if (contacts.length > 0 && state.contacts.length === 0) {
        dispatch({ type: "SET_CONTACTS", payload: contacts });
      }
    };

    if (!contactsFetched.current) {
      fetchContactsFromDB();
      contactsFetched.current = true;
    }
  }, [dispatch, state.contacts.length]);

  // Add new contact and update the state immediately to reflect changes
  const handleSaveContact = async (newContact) => {
    // Prevent adding duplicate contact by checking if it already exists
    const existingContact = state.contacts.find(
      (contact) => contact.phone === newContact.phone
    );
    if (existingContact) {
      alert("This contact already exists!");
      return;
    }

    // Update the context state with the new contact
    dispatch({
      type: "SET_CONTACTS",
      payload: [...state.contacts, newContact], // Update context state directly
    });

    // Save the new contact to IndexedDB
    await saveContact(newContact);

    // Close the form after saving the contact
    setIsFormVisible(false);
  };

  const handleDeleteAll = async () => {
    await deleteAllDataWithConfirmation(); // Assuming this function clears the IndexedDB
    dispatch({ type: "SET_CONTACTS", payload: [] }); // Clear the context state to reflect the update
  };

  return (
    <div className="flex h-screen bg-red-200">
      <div className="w-1/3 bg-white border-r border-red-300 p-4">
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white p-2 mb-4 rounded-lg"
        >
          Add Contact
        </button>
        {/* <button
          onClick={handleDeleteAll}
          className="bg-red-500 text-white p-2 mt-4 rounded-lg"
        >
          Delete All Contacts
        </button> */}
        {/* Show AddContactForm only if isFormVisible is true */}
        {isFormVisible && <AddContactForm onContactAdded={handleSaveContact} />}

        <div className="overflow-y-auto  max-h-[calc(100vh-100px)] scrollbar-hidden">
          {/* Adjust height as per your layout */}
          <ContactList contacts={state.contacts} />
        </div>
      </div>

      <div className="flex-1 bg-blue-100">
        <ChatWindow />
      </div>
    </div>
  );
}

function AppWithProvider() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default AppWithProvider;
