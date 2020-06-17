import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function formatDate() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
}

const testSchema = Yup.object().shape({
  availableAt: Yup.date().min(
    formatDate(),
    `Data nie możne być wcześniejsza od ${formatDate()}`
  ),
  availableUntil: Yup.date().min(
    formatDate(),
    `Data nie możne być wcześniejsza od ${formatDate()}`
  )
});

const ActivateTestForm = ({ initialState, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={testSchema}
    >
      {({ errors, touched }) => (
        <Form className='form'>
          <div className='form-group'>
            <h2 className='primary-text'>Aktywny od</h2>
            <Field name='availableAt' type='date' placeholder='Aktywny od' />
            {errors.date && touched.date ? <div>{errors.date}</div> : null}
          </div>
          <div className='form-group'>
            <h2 className='primary-text'>Aktywny do</h2>
            <Field name='availableUntil' type='date' placeholder='Aktywny do' />
            {errors.date && touched.date ? <div>{errors.date}</div> : null}
          </div>
          <button type='submit' className='dashboard-button btn-primary'>
            Aktywuj test
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ActivateTestForm;
