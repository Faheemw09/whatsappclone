import { init, i, id } from "@instantdb/core";

const APP_ID = "f453ba05-8970-4461-8f29-c38ee658d9e9";

export const schema = i.schema({
  entities: {
    users: i.entity({
      id: i.string(),
      name: i.string(),
      email: i.string(),
      createdAt: i.date(),
    }),
    messages: i.entity({
      senderId: i.string(),
      receiverId: i.string(),
      text: i.string(),
      timestamp: i.date(),
    }),
  },
});

// Initialize database
export const db = init({ appId: APP_ID, schema });
// console.log("Database object:", db);
console.log("DB Methods", db);
// console.log("Users collection:", db.users);
// Utility for generating unique IDs
export const generateId = id;
