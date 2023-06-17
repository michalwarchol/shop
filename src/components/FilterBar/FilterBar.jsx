import React, { useContext } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import { UserContext } from "providers/UserProvider";
import TextInput from "components/TextInput/TextInput";
import FilterButton from "components/FilterButton/FilterButton";
import bucket from "src/assets/images/bucket.svg";

import styles from "./FilterBar.styles.scss";
import { getDefaultFilters } from './FilterBar.utils';
import validationSchema from "./FilterBar.validation";

const FilterBar = () => {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  console.log('xdddd', params);
  console.log(getDefaultFilters(params));

  const location = useLocation();
  const navigate = useNavigate();
  let searchTimeout = null;

  const search = (values) => {
    const params = Object.fromEntries([...searchParams]);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      if (location !== "/") {
        navigate("/");
      }
      setSearchParams({ ...params, ...values });
    }, 2000);
  };

  const goToBucket = () => {
    navigate("/cart");
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBarInner}>
        <Formik
          initialValues={getDefaultFilters(params)}
          onSubmit={search}
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form className={styles.form}>
              <div className={styles.inputs}>
                <TextInput
                  name="search"
                  value={values.search}
                  handleChange={handleChange}
                  placeholder="szukaj"
                />
                <FilterButton />
              </div>
              <div
                className={styles.bucket}
                onClick={goToBucket}
              >
                <img
                  src={bucket}
                  alt="bucket"
                />
                {user?.bucket && <div className={styles.itemAmount}>{user?.bucket.length}</div>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FilterBar;
