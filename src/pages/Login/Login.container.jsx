import React, { useContext } from 'react';

import config from 'src/config';

import View from './Login.view';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'providers/UserProvider';

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    fetch(`${config.apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email: values.email, password: values.password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(res => {
      setUser(res.user);
      localStorage.setItem('userId', res.user.id);
      navigate('/');
    }).catch(error => console.log(error));
  }

  const redirectToRegister = () => {
    navigate('/register');
  }

  return <View onSubmit={onSubmit} redirectToRegister={redirectToRegister} />;
}

export default LoginPage;
