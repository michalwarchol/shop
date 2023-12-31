import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import cls from "classnames";

import { UserContext } from "providers/UserProvider";
import Button from "components/Button/Button";
import power from "src/assets/images/power.svg";
import avatar from "src/assets/images/avatar.svg";

import styles from "./Header.styles.scss";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.clear('userId');
    navigate("/login");
  };

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };

  const settings = () => {
    navigate("/settings");
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <span onClick={() => navigate("/")}>Alkohole24</span>
        </div>
        <div className={styles.buttons}>
          {user ? (
            <>
              <Button
                className={cls(styles.button, styles.userButton)}
                onClick={settings}
              >
                <img
                  src={avatar}
                  alt="avatar"
                />
                {user.firstName}
              </Button>
              <Button
                className={styles.logoutButton}
                onClick={logout}
              >
                <img
                  src={power}
                  alt="power"
                />
              </Button>
            </>
          ) : (
            <>
              <Button
                className={styles.button}
                onClick={register}
              >
                ZAREJESTRUJ
              </Button>
              <Button
                className={styles.button}
                onClick={login}
              >
                ZALOGUJ
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
