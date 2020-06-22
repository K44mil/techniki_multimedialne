import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import { Select } from 'formik-material-ui';

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .strict(false)
    .trim()
    .email(VALIDATION_ERRORS.email)
    .required(VALIDATION_ERRORS.required),
  role: Yup.mixed().oneOf(['student', 'teacher']),
  password: Yup.string()
    .strict(false)
    .trim()
    .min(8, VALIDATION_ERRORS.short)
    .max(32, VALIDATION_ERRORS.long)
    .required(VALIDATION_ERRORS.required),
  firstName: Yup.string()
    .strict(false)
    .trim()
    .min(2, VALIDATION_ERRORS.short)
    .max(50, VALIDATION_ERRORS.long)
    .required(VALIDATION_ERRORS.required),
  lastName: Yup.string()
    .strict(false)
    .trim()
    .min(2, VALIDATION_ERRORS.short)
    .max(50, VALIDATION_ERRORS.long)
    .required(VALIDATION_ERRORS.required)
});

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const { email, role, password, firstName, lastName } = formData;

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='container'>
      <div>
        <h1 className='large text-primary'>Rejestracja</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Stwórz swoje konto
        </p>
        <Formik
          initialValues={formData}
          validationSchema={registerSchema}
          onSubmit={async values => {
            console.log(values);
            register(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className='form'>
              <div className='form-group'>
                <Field name='email' type='email' placeholder='Email' />
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>

              <div className='form-group'>
                <InputLabel htmlFor='role-simple'>Role</InputLabel>
                <Field
                  component={Select}
                  id='simple-select'
                  name='role'
                  onChange={e => onChange(e)}
                  value={formData.role}
                  inputProps={{
                    id: 'role-simple'
                  }}
                >
                  <MenuItem value='student'>student</MenuItem>
                  <MenuItem value='teacher'>teacher</MenuItem>
                </Field>
              </div>

              <div className='form-group'>
                <Field type='password' name='password' placeholder='Hasło' />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <div className='form-group'>
                <Field type='text' placeholder='Imię' name='firstName' />
                {errors.firstName && touched.firstName ? (
                  <div>{errors.firstName}</div>
                ) : null}
              </div>

              <div className='form-group'>
                <Field type='text' name='lastName' placeholder='Nazwisko' />
                {errors.lastName && touched.lastName ? (
                  <div>{errors.lastName}</div>
                ) : null}
              </div>

              <input
                type='submit'
                className='btn btn-primary'
                value='Rejestracja'
              />
            </Form>
          )}
        </Formik>
        <p className='my-1'>
          Masz już konto? <Link to='/login'>Zaloguj się</Link>
        </p>
      </div>
    </section>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
