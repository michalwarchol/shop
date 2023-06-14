import React, { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserContext = createContext(null);

const UserProvider = () => {
  const [user, setUser] = useState({id: 1, firstName: 'Michal', bucket: [{}, {}]});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  )
};

export default UserProvider;
export { UserContext };
