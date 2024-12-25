import React from "react";
import ContactList from "../components/ContactList";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  return (
    <div className="flex w-full">
      <ContactList />
      <ChatWindow />
    </div>
  );
};

export default Home;
