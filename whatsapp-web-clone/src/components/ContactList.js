import React from "react";
import { useAppContext } from "../context/AppContext";
import ContactListItem from "./ContactListItem"; // Import the new ContactListItem component

function ContactList() {
  const { state, dispatch } = useAppContext();

  // Handle selecting a contact
  const handleSelectContact = (contact) => {
    dispatch({ type: "SET_SELECTED_CONTACT", payload: contact });
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contacts</h2>
      </div>

      {state.contacts.length === 0 ? (
        <p>No contacts available. Add a contact!</p>
      ) : (
        <ul className="space-y-2">
          {state.contacts.map((contact) => (
            <ContactListItem
              key={contact.id}
              contact={contact}
              isSelected={state.selectedContact?.id === contact.id}
              onSelect={handleSelectContact}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
