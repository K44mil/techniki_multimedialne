import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';

function formatDate() {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return date;
}

const taskSchema = Yup.object().shape({
  name: Yup.string()
    .strict(false)
    .trim()
    .required(VALIDATION_ERRORS.required),
  expireDate: Yup.date().min(
    formatDate(),
    `Data nie możne być wcześniejsza od ${formatDate()}`
  )
});

export const files = [];
const CreateTaskForm = ({ initialState, handleSubmit }) => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState([]);
  const onChange = e => {
    files.length === 3
      ? document.getElementById('files').setAttribute('disabled', 'disabled')
      : document.getElementById('files').removeAttribute('disabled');
    if (e.target.files !== undefined) {
      const val = e.target.files[0];
      setFile(prev => prev.concat(val));
      const val2 = e.target.files[0].name;
      setFilename(prev => prev.concat(val2));
    }
  };

  let flaga = 0;
  if (files.length > 0 && files !== undefined && file.length > 0) {
    for (const f of files) {
      if (f[0].name === file[file.length - 1].name) flaga = 1;
    }
  }

  if (flaga === 0 && file.length > 0) files.push(file);

  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={taskSchema}
    >
      {({ errors, touched }) => (
        <Form className='form'>
          <div className='form-group'>
            <Field name='name' type='text' placeholder='Task name' />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </div>
          <div className='form-group'>
            <Field
              type='text'
              component='textarea'
              name='description'
              placeholder='Description'
            />
          </div>
          <div className='form-group'>
            <Field name='expireDate' type='date' placeholder='Expire day' />
            {errors.date && touched.date ? <div>{errors.date}</div> : null}
          </div>
          <div className='form-group'>
            <Field
              id='files'
              name='files'
              type='file'
              placeholder='File'
              onChange={onChange}
            />
          </div>
          <div form-group>
            {filename.map(el => (
              <div>{el}</div>
            ))}
          </div>
          <button type='submit' className='dashboard-button btn-primary'>
            Stwórz zadanie
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTaskForm;
