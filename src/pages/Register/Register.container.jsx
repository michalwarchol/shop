import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "providers/UserProvider";
import config from "src/config";

import View from "./Register.view";
import axios from "axios";

const RegisterPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const me = async (userId) => {
    try {
      const res = await axios.get(`${config.apiUrl}/me/${userId}`);

      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values) => {
    const now = new Date();

    //Day
    const day = "12-12-2000".substring(0, 2);
    //Month
    const month = "12-12-2000".substring(3, 5);
    //Year
    const year = "12-12-2000".substring(6);

    const birthdate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const age = now.getFullYear() - birthdate.getFullYear();

    const body = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      age,
      address: `${values.street} ${values.houseNumber}`,
      password: values.password,
    };
    try {
      const res = await axios.post(`${config.apiUrl}/register`, body);

      if (res.data.error) {
        return;
      }

      localStorage.setItem("userId", res.data.user);

      me(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <View
      onSubmit={onSubmit}
      redirectToLogin={redirectToLogin}
    />
  );
};

export default RegisterPage;
