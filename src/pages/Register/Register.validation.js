import * as Yup from 'yup';

export default Yup.object({
  firstName: Yup.string().required('Pole jest wymagane'),
  lastName: Yup.string().required('Pole jest wymagane'),
  birth: Yup.string().matches(/^(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)\d\d$/ , 'Niepoprawny format').required('Pole jest wymagane'),
  email: Yup.string().email('Niepoprawny adres email').required('Pole jest wymagane'),
  password: Yup.string().min(8, 'Hasło musi zawierać co najmniej 8 znaków').required('Pole jest wymagane'),
  passwordConfirm: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')], 'Powtórzone hasło jest niezgodne') : field,
  ),
  street: Yup.string().required('Pole jest wymagane'),
  houseNumber: Yup.string().required('Pole jest wymagane'),
  postalCode: Yup.string().required('Pole jest wymagane'),
  city: Yup.string().required('Pole jest wymagane'),
});
