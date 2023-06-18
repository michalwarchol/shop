import React, { useContext, useState } from "react";

import styles from "./Settings.styles.scss";
import { UserContext } from "providers/UserProvider";
import Button from "components/Button/Button";
import OrdersHistoryPage from "pages/OrdersHistory/OrdersHistory.container";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [isShowOrders, setShowOrders] = useState(false);

  const showOrders = () => {
    setShowOrders(true);
  };

  const logout = () => {
    setUser(null);
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
      </div>
      {isShowOrders && <OrdersHistoryPage setShowOrders={setShowOrders} />}
    </div>
  );
};

export default Settings;
