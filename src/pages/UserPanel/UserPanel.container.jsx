import React, { useContext } from "react";

import View from "./UserPanel.view";
import { UserContext } from "providers/UserProvider";

const UserPanelPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return <View />;
};

export default UserPanelPage;
