import React from 'react';

import View from './Login.view';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const onSubmit = (values) => {
    // TODO
  }

  const redirectToRegister = () => {
    navigate('/register');
  }

  return <View onSubmit={onSubmit} redirectToRegister={redirectToRegister} />;
}

export default LoginPage;
