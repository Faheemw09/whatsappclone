import { openDB } from "idb"; // IndexedDB library

const dbName = "whatsappCloneDB";
const storeName = "messages";

// Save message to IndexedDB
export const saveMessage = async (contactId, message) => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: "id" });
        // Create an index on contactId for easy retrieval
        store.createIndex("contactIdIndex", "contactId");
      }
    },
  });

  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  // Add contactId to each message for correct categorization
  await store.put({ ...message, contactId });

  await tx.done;
};

// Get messages for a specific contactId
export const getMessages = async (contactId) => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: "id" });
        // Create an index on contactId for easy retrieval
        store.createIndex("contactIdIndex", "contactId");
      }
    },
  });

  // Retrieve messages using the created index
  const store = db.transaction(storeName, "readonly").objectStore(storeName);
  const index = store.index("contactIdIndex"); // Use the index for contactId
  const storedMessages = await index.getAll(contactId); // Fetch all messages for this contactId
  return storedMessages;
};
