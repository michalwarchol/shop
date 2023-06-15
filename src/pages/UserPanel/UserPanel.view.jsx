import React from "react";

import styles from "./UserPanel.styles.scss";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Settings from "components/Settings/Settings";
import { Outlet } from "react-router-dom";

const UserPanelView = () => {
  return (
    <div>
      <Outlet />
      <Header />
      <Settings />
      <Footer />
    </div>
  );
};

export default UserPanelView;
