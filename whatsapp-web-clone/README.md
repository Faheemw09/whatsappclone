# WhatsApp Clone


*A seamless and interactive chat application inspired by WhatsApp.*

## 🌟 Overview

The **WhatsApp Clone** is a feature-rich, real-time messaging web application built using modern web technologies. It allows users to send messages, view chat histories, and interact with other users in a sleek and responsive UI. This project demonstrates a robust implementation of database integration, component-based architecture, and a user-friendly experience.

🔗 [Live Demo](https://whatsappclone-lake.vercel.app/)

---

## 🚀 Features

- **User Authentication**  
  Securely authenticate users for a personalized experience.

- **Real-time Messaging**  
  Send and receive messages instantly using a real-time database.

- **Dynamic Contact List**  
  Displays active users and their last messages.




---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS  

- **Database:** InstantDB (Real-time database)  
- **Deployment:** Vercel  

---

## 📂 Project Structure

```plaintext
├── src/
│   ├── components/
│   │   ├── ContactList.js   # Contact list with dynamic updates
│   │   └── ChatWindow.js    # Displays messages and input field
│   ├── utils/
│   │   └── db.js            # Database schema and initialization
│   └── App.js               # Main application logic
├── public/
│   └── index.html           # Entry point
├── .env                     # Environment variables
├── .gitignore               # Files to ignore in version control
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
