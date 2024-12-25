import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const useMessages = () => {
  return useContext(MessageContext);
};

export default useMessages;
