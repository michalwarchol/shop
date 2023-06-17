import React, { createContext, useEffect, useState } from 'react';

import config from 'src/config';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const me = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setUser(null);
      return;
    }

    fetch(`${config.apiUrl}/me/${userId}`, {
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
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
