import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from 'providers/UserProvider';
import config from 'src/config';

import View from './Register.view';

const RegisterPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const me = (userId) => {
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
      navigate('/front');
    }).catch(error => console.log(error));
  }

  const onSubmit = (values) => {
  const now = new Date();

  //Day
  const day = '12-12-2000'.substring(0, 2);
  //Month
  const month = '12-12-2000'.substring(3, 5);
  //Year
  const year = '12-12-2000'.substring(6);

  const birthdate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  const age = now.getFullYear() - birthdate.getFullYear();

    const body = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      age,
      address: `${values.street} ${values.houseNumber}`,
      password: values.password,
    }
    fetch(`${config.apiUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      if(res.error) {
        return;
      }

      localStorage.setItem('userId', res.user);

      me(res.user);  
    })
    .catch(error => console.log(error));
  }

  const redirectToLogin = () => {
    navigate('/login_front');
  }

  return <View onSubmit={onSubmit} redirectToLogin={redirectToLogin} />;
}

export default RegisterPage;
