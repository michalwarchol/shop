import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormikContext } from 'formik';

import filters from 'src/assets/images/filters.svg';
import TextInput from 'components/TextInput/TextInput';

import styles from './FilterButton.styles.scss';
import Button from 'components/Button/Button';

const FilterButton = () => {
  const { values, handleChange, errors, touched, submitForm } = useFormikContext();
  const [isOpen, setIsOpen] = useState();
  const buttonRef = useRef(null);
  let portalX = 0;
  let portalY = 0;

  if(buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    portalX = rect.left;
    portalY = rect.bottom + 10;
  }

  return (
    <>
      <div className={styles.filterButton} onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        <div className={styles.filterButtonInner}>
          <span>filtry</span>
          <img src={filters} alt="filters" />
        </div>
      </div>
      {isOpen && createPortal(
        <div className={styles.portal} style={{position: 'absolute', top: portalY, left: portalX}}>
          <div className={styles.filter}>
            <span className={styles.filterName}>Cena:</span>
            <TextInput
              name='priceFrom'
              value={values.priceFrom}
              handleChange={handleChange}
              placeholder="min"
              error={errors.priceFrom}
              touched={touched.priceFrom}
              className={styles.filterInput}
            />
            <TextInput
              name='priceTo'
              value={values.priceTo}
              handleChange={handleChange}
              placeholder="max"
              error={errors.priceTo}
              touched={touched.priceTo}
              className={styles.filterInput}
            />
          </div>
          <div className={styles.filter}>
            <span className={styles.filterName}>Zawartość alkoholu:</span>
            <TextInput
              name='alcoholFrom'
              value={values.alcoholFrom}
              handleChange={handleChange}
              placeholder="min"
              error={errors.alcoholFrom}
              touched={touched.alcoholFrom}
              className={styles.filterInput}
            />
            <TextInput
              name='alcoholTo'
              value={values.alcoholTo}
              handleChange={handleChange}
              placeholder="max"
              error={errors.alcoholTo}
              touched={touched.alcoholTo}
              className={styles.filterInput}
            />
          </div>
          <Button className={styles.button} type="button" onClick={() => {
            setIsOpen(false);
            submitForm();
          }}>
            Filtruj
          </Button>
        </div>,
        document.body
      )}
    </>
  );
};

export default FilterButton;
