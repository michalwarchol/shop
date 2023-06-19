import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

import config from "src/config";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const me = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setUser(null);
      return;
    }

    try {
      const res = await axios.get(`${config.apiUrl}/me/${userId}`);

      if (res.data.error || res.error) {
        throw Error("User retrieval error");
      }
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  useEffect(() => {
    me();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
export { UserContext };
