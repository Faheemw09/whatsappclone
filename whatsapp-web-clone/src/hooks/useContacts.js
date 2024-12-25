import { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

const useContacts = () => {
  return useContext(ContactContext);
};

export default useContacts;
