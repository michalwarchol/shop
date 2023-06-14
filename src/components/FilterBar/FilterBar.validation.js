import * as Yup from 'yup';

export default Yup.object({
  priceFrom: Yup.number().typeError('Dozwolone są tylko liczby'),
  priceTo: Yup.number().typeError('Dozwolone są tylko liczby'),
  alcoholFrom: Yup.number().typeError('Dozwolone są tylko liczby'),
  alcoholTo: Yup.number().typeError('Dozwolone są tylko liczby'),
});
