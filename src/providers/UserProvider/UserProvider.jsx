import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import config from 'src/config';

const UserContext = createContext(null);

const UserProvider = () => {
  const [user, setUser] = useState(null);

  const me = () => {
    fetch(`${config.apiUrl}/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      if(res.error) {
        setUser(null);
        return;
      }
      setUser(res.user);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    me();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
