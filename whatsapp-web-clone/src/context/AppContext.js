// AppContext.js
import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  contacts: [],
  selectedContact: null,
  messages: [],
};

// Define the reducer function to manage the state
function appReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "SET_SELECTED_CONTACT":
      return { ...state, selectedContact: action.payload };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
