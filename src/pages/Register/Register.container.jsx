import React from 'react';

import View from './Register.view';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const onSubmit = (values) => {
    // TODO
  }

  const redirectToLogin = () => {
    navigate('/login');
  }

  return <View onSubmit={onSubmit} redirectToLogin={redirectToLogin} />;
}

export default RegisterPage;
