import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';

const studentSchema = Yup.object().shape({
  email: Yup.string()
    .strict(false)
    .trim()
    .email(VALIDATION_ERRORS.email)
    .required(VALIDATION_ERRORS.required)
});

const AddStudentForm = ({ initialState, handleSubmit }) => (
  <Formik
    initialValues={initialState}
    validationSchema={studentSchema}
    onSubmit={handleSubmit}
  >
    {({ errors, touched }) => (
      <Form className='form'>
        <div className='form-group'>
          <Field name='email' type='email' placeholder='Student email' />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
        </div>

        <button type='submit' className='dashboard-button btn-primary'>
          Dodaj ucznia
        </button>
      </Form>
    )}
  </Formik>
);

export default AddStudentForm;
