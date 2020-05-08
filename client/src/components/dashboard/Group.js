import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';

const groupSchema = Yup.object().shape({
  name: Yup.string()
    .strict(false)
    .trim()
    .max(100, VALIDATION_ERRORS.long)
    .required(VALIDATION_ERRORS.required),

  description: Yup.string()
    .strict(false)
    .trim()
    .max(250, VALIDATION_ERRORS.long)
});

const Group = ({ initialState, setRef, handleSubmit }) => (
  <Formik
    ref={setRef}
    initialValues={initialState}
    validationSchema={groupSchema}
    onSubmit={handleSubmit}
  >
    {({ errors, touched }) => (
      <Form className='form'>
        <div className='form-group'>
          <Field name='name' type='text' placeholder='Group name' />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
        </div>

        <div className='form-group'>
          <Field
            type='text'
            component='textarea'
            name='description'
            placeholder='Description'
          />
          {errors.description && touched.description ? (
            <div>{errors.description}</div>
          ) : null}
        </div>

        <button type='submit' className='dashboard-button btn-primary'>
          Stwórz grupę
        </button>
      </Form>
    )}
  </Formik>
);

export default Group;
