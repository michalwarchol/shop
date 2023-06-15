import React, { useContext } from "react";

import styles from "./Settings.styles.scss";
import { UserContext } from "providers/UserProvider";
import Button from "components/Button/Button";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const showOrders = () => {
    navigate("orders");
  };

  const logout = () => {
    setUser(null);
  };

  const deleteAccount = () => {};

  const handleDelete = () => {
    if (!window.confirm("Na pewno chcesz usunąć swoje konto?")) {
      return;
    }
    deleteAccount();
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settingsInner}>
        <p className={styles.hello}>Witaj {user.firstName}!</p>
        <Button
          className={styles.button}
          onClick={showOrders}
        >
          HISTORIA ZAMÓWIEŃ
        </Button>
        <Button
          className={styles.button}
          onClick={logout}
        >
          WYLOGUJ SIĘ
        </Button>
        <Button
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          USUŃ KONTO
        </Button>
      </div>
    </div>
  );
};

export default Settings;
