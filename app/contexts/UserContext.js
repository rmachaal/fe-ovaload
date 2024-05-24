import React, { useState } from "react";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("jimratty");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
