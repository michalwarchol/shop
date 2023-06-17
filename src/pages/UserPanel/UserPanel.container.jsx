import React, { useContext, useEffect } from "react";

import View from "./UserPanel.view";
import { UserContext } from "providers/UserProvider";
import { useNavigate } from "react-router-dom";

const UserPanelPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      return;
    }

    navigate("/login");
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <View />;
};

export default UserPanelPage;
