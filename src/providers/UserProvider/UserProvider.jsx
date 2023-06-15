import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const UserContext = createContext(null);

const UserProvider = () => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Michal",
    bucket: [
      { id: "3", price: 69.99, name: "Jagermaister 0,7L", amount: 2 },
      { id: "2", price: 79.99, amount: 1, name: "Wino Chateau de Terrefort" },
    ],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
