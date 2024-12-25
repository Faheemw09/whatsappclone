import { openDB } from "idb"; // idb package for IndexedDB

const dbName = "whatsappCloneDB";
const messagesStoreName = "messages";
const contactsStoreName = "contacts"; // New store for contacts

// Create or open the IndexedDB database and object store
async function createDB() {
  try {
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        // Creating the 'messages' object store
        if (!db.objectStoreNames.contains(messagesStoreName)) {
          db.createObjectStore(messagesStoreName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }

        // Creating the 'contacts' object store
        if (!db.objectStoreNames.contains(contactsStoreName)) {
          db.createObjectStore(contactsStoreName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
    return db;
  } catch (error) {
    console.error("Error creating or opening the database:", error);
    throw new Error("Failed to open or create IndexedDB");
  }
}

// Save a message in IndexedDB
export const saveMessage = async (contactId, message) => {
  try {
    if (!message || !message.text || !message.sender || !message.timestamp) {
      console.error("Message is missing required properties");
      return;
    }

    const db = await createDB();
    const tx = db.transaction(messagesStoreName, "readwrite");
    const store = tx.objectStore(messagesStoreName);

    const newMessage = { ...message, contactId, id: Date.now() }; // Add contactId and timestamp
    await store.put(newMessage); // Save the message
    await tx.done;
  } catch (error) {
    console.error("Error saving the message to IndexedDB:", error);
  }
};

// Get all messages for a specific contact from IndexedDB
// Get all messages for a specific contact from IndexedDB
export const getMessages = async (contactId) => {
  try {
    const db = await createDB();
    const tx = db.transaction(messagesStoreName, "readonly");
    const store = tx.objectStore(messagesStoreName);

    const messages = await store.getAll(); // Fetch all messages
    const filteredMessages = messages.filter(
      (msg) => msg.contactId === contactId
    ); // Filter by contactId
    await tx.done;

    return filteredMessages;
  } catch (error) {
    console.error("Error retrieving messages from IndexedDB:", error);
    return []; // Return empty array in case of error
  }
};

// Get all contacts from IndexedDB
export const getContacts = async () => {
  try {
    const db = await createDB();
    const tx = db.transaction(contactsStoreName, "readonly");
    const store = tx.objectStore(contactsStoreName);

    const contacts = await store.getAll(); // Fetch all contacts
    await tx.done;

    return contacts;
  } catch (error) {
    console.error("Error retrieving contacts from IndexedDB:", error);
    return []; // Return empty array in case of error
  }
};

// Save a contact in IndexedDB
export const saveContact = async (contact) => {
  try {
    const db = await createDB();
    const tx = db.transaction(contactsStoreName, "readwrite");
    const store = tx.objectStore(contactsStoreName);

    await store.put(contact); // Save contact data
    await tx.done;
  } catch (error) {
    console.error("Error saving contact to IndexedDB:", error);
  }
};

// utils/instantdb.js

export const deleteAllContactsAndMessages = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "id" });
      }
    },
  });

  const tx = db.transaction(["contacts", "messages"], "readwrite");

  // Clear both stores (contacts and messages)
  const contactsStore = tx.objectStore("contacts");
  const messagesStore = tx.objectStore("messages");

  await contactsStore.clear();
  await messagesStore.clear();

  await tx.done;

  console.log("All contacts and messages have been deleted.");
};
// utils/instantdb.js

export const deleteAllDataWithConfirmation = async () => {
  const confirmation = window.confirm(
    "Are you sure you want to delete all contacts and messages?"
  );
  if (confirmation) {
    await deleteAllContactsAndMessages();
    alert("All contacts and messages have been deleted.");
  } else {
    alert("Deletion cancelled.");
  }
};
