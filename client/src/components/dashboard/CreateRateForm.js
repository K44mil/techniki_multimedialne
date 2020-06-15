import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const rateSchema = Yup.object().shape({
  value: Yup.number()
    .required()
    .positive()
    .integer()
    .min(2, 'Ocena nie może być mniejsza od 2')
    .max(5, 'Ocena nie może być większa od 5')
});

const CreateRateForm = ({ initialState, handleSubmit }) => (
  <Formik
    initialValues={initialState}
    validationSchema={rateSchema}
    onSubmit={handleSubmit}
  >
    {({ errors, touched }) => (
      <Form className='form'>
        <div className='form-group'>
          <Field name='value' type='text' placeholder='Ocena' />
          {errors.value && touched.value ? <div>{errors.value}</div> : null}
        </div>
        <div className='form-group'>
          <Field
            type='text'
            component='textarea'
            name='comment'
            placeholder='Description'
          />
        </div>
        <button type='submit' className='dashboard-button btn-primary'>
          Dodaj ocene
        </button>
      </Form>
    )}
  </Formik>
);

export default CreateRateForm;
