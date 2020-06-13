import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { VALIDATION_ERRORS } from '../../shared/consts/FormValidationErrors.constants';

const solutionSchema = Yup.object().shape({
  text: Yup.string()
    .strict(false)
    .trim()
    .required(VALIDATION_ERRORS.required)
});

export const files = {
  file: ''
};
const CreateSolutionForm = ({ initialState, handleSubmit }) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const onChange = e => {
    // files.length === 1
    //   ? document.getElementById('files').setAttribute('disabled', 'disabled')
    //   : document.getElementById('files').removeAttribute('disabled');
    if (e.target.files !== undefined) {
      const val = e.target.files[0];
      setFile(val);
      const val2 = e.target.files[0].name;
      setFilename(val2);
    }
  };
  files.file = file;
  //   let flaga = 0;
  //   if (files.length > 0 && files !== undefined && file.length > 0) {
  //     for (const f of files) {
  //       if (f[0].name === file[file.length - 1].name) flaga = 1;
  //     }
  //   }

  //   if (flaga === 0 && file.length > 0) files.push(file);

  return (
    <Formik
      initialValues={initialState}
      onSubmit={handleSubmit}
      validationSchema={solutionSchema}
    >
      {({ errors, touched }) => (
        <Form className='form'>
          <div className='form-group'>
            <Field
              name='text'
              type='text'
              component='textarea'
              placeholder='Solution'
            />
            {errors.text && touched.text ? <div>{errors.text}</div> : null}
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
          <div form-group>{filename}</div>
          <button type='submit' className='dashboard-button btn-primary'>
            Wyślij rozwiązanie
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateSolutionForm;
