import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FooterSmall from 'components/FooterSmall';
import TextInput from 'components/TextInput';

import { initialValues } from './Login.consts';
import styles from './Login.styles.scss';
import Button from 'components/Button/Button';

const Login = ({ onSubmit, redirectToRegister }) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.header}>
          Alkohole24
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object({
            email: Yup.string().email('Niepoprawny adres email').required('Pole jest wymagane'),
            password: Yup.string().min(8, 'Hasło musi zawierać co najmniej 8 znaków').required('Pole jest wymagane'),
          })}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form className={styles.formContainer}>
              <div className={styles.inputs}>
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
              </div>
              <Button type="submit">
                ZALOGUJ
              </Button>
              <div className={styles.register}>
                nie masz konta? <span onClick={redirectToRegister}>zarejestruj</span>
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
