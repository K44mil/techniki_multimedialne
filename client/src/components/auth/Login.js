import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .strict(false)
    .trim()
    .email(VALIDATION_ERRORS.email)
    .required(VALIDATION_ERRORS.required),
  password: Yup.string()
    .strict(false)
    .trim()
    .min(8, VALIDATION_ERRORS.short)
    .max(32, VALIDATION_ERRORS.long)
    .required(VALIDATION_ERRORS.required)
});

const Login = ({ login, isAuthenticated }) => {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // });

  const initialState = {
    email: '',
    password: ''
  };

  // const onChange = e =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <section className='container'>
      <div>
        <h1 className='large text-primary'>Login</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log in to your account
        </p>
        <Formik
          initialValues={initialState}
          validationSchema={loginSchema}
          onSubmit={async values => {
            login(values);
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
                <Field type='password' name='password' placeholder='Password' />
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>

              <input type='submit' className='btn btn-primary' value='Login' />
            </Form>
          )}
        </Formik>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
      </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
