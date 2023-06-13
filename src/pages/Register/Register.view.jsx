import React from 'react';
import { Formik, Form } from 'formik';

import FooterSmall from 'components/FooterSmall';
import TextInput from 'components/TextInput';
import Button from 'components/Button/Button';

import { initialValues } from './Register.consts';
import styles from './Register.styles.scss';
import validationSchema from './Register.validation';

const Login = ({ onSubmit, redirectToLogin }) => {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerForm}>
        <div className={styles.header}>
          Alkohole24
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className={styles.formContainer}>
              <div className={styles.inputs}>
                <TextInput
                  name="firstName"
                  placeholder="imię"
                  value={values.firstName}
                  handleChange={handleChange}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <TextInput
                  name="lastName"
                  placeholder="nazwisko"
                  value={values.lastName}
                  handleChange={handleChange}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
                <TextInput
                  name="birth"
                  placeholder="data urodzenia (dd-mm-rrrr)"
                  value={values.birth}
                  handleChange={handleChange}
                  error={errors.birth}
                  touched={touched.birth}
                />
                <TextInput
                  name="email"
                  type="email"
                  placeholder="email"
                  value={values.email}
                  handleChange={handleChange}
                  error={errors.email}
                  touched={touched.email}
                />
                <TextInput
                  name="password"
                  type="password"
                  placeholder="hasło"
                  value={values.password}
                  handleChange={handleChange}
                  error={errors.password}
                  touched={touched.password}
                />
                <TextInput
                  name="passwordConfirm"
                  type="password"
                  placeholder="ponów hasło"
                  value={values.passwordConfirm}
                  handleChange={handleChange}
                  error={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                />
                <TextInput
                  name="street"
                  placeholder="miejsce zamieszkania"
                  value={values.street}
                  handleChange={handleChange}
                  error={errors.street}
                  touched={touched.street}
                />
                <TextInput
                  name="houseNumber"
                  placeholder="numer domu/mieszkania"
                  value={values.houseNumber}
                  handleChange={handleChange}
                  error={errors.houseNumber}
                  touched={touched.houseNumber}
                />
                <TextInput
                  name="postalCode"
                  placeholder="kod pocztowy"
                  value={values.postalCode}
                  handleChange={handleChange}
                  error={errors.postalCode}
                  touched={touched.postalCode}
                />
                <TextInput
                  name="city"
                  placeholder="miasto"
                  value={values.city}
                  handleChange={handleChange}
                  error={errors.city}
                  touched={touched.city}
                />
              </div>
              <Button type="submit">
                ZAREJESTRUJ
              </Button>
              <div className={styles.login}>
                masz już konto? <span onClick={redirectToLogin}>zaloguj</span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <FooterSmall />
    </div>
  );
};

export default Login;
