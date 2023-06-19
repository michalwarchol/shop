import React, { useContext } from "react";

import config from "src/config";

import View from "./Login.view";
import { useNavigate } from "react-router-dom";
import { UserContext } from "providers/UserProvider";
import axios from "axios";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await axios.post(`${config.apiUrl}/login`, { email: values.email, password: values.password });

      setUser(res.data.user);
      localStorage.setItem("userId", res.data.user.id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <View
      onSubmit={onSubmit}
      redirectToRegister={redirectToRegister}
    />
  );
};

export default LoginPage;
