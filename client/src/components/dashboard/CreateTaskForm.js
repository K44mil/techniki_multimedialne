import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

export const files = [];
const CreateTaskForm = ({ initialState, handleSubmit }) => {
  const [file, setFile] = useState([]);
  const [filename, setFilename] = useState([]);
  const onChange = e => {
    if (e.target.files !== undefined) {
      const val = e.target.files[0];
      setFile(prev => prev.concat(val));
      const val2 = e.target.files[0].name;
      setFilename(prev => prev.concat(val2));
    }
  };

  console.log(`TU FILES ${files.length}`);
  let flaga = 0;
  if (files.length > 0 && files !== undefined) {
    for (const f of files) {
      if (f[0].name === file[file.length - 1].name) flaga = 1;
    }
  }

  if (flaga === 0 && file.length > 0) files.push(file);
  // console.log(file);
  // if (file.length > 0)
  // console.log(files);
  return (
    <Formik initialValues={initialState} onSubmit={handleSubmit}>
      {() => (
        <Form className='form'>
          <div className='form-group'>
            <Field name='name' type='text' placeholder='Task name' />
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
            <Field name='date' type='date' placeholder='Expire day' />
          </div>
          <div className='form-group'>
            <Field
              name='file'
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
