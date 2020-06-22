import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const OpenQuestionForm = ({ initialState, number, questionParams }) => {
  const [formData, setFormData] = useState({
    text: '',
    type: 'o',
    time: 0
  });

  const [formAnswers, setFormAnswers] = useState({});

  const getValues = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getAnswers = e => {
    setFormAnswers({ ...formAnswers, [e.target.name]: e.target.value });
  };

  const [formNumber, setNumber] = useState(1);

  const [isDisable, setDisabled] = useState(false);
  //for additional questions
  const MyForm = number => {
    if (number.number === 1) {
      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Wzór 2</p>
            <Field name='answerD' type='text' placeholder='Odpowiedź D' />
          </div>
        </>
      );
    } else if (number.number === 2) {
      setDisabled(true);
      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Wzór 3</p>
            <Field name='answerE' type='text' placeholder='Odpowiedź E' />
          </div>
        </>
      );
    }
  };
  // console.log(boxState);
  const [forms, setForm] = useState([]);
  const addForm = () => {
    if (number <= 2) setForm(prev => [...prev, <MyForm number={formNumber} />]);
  };

  let answers = [];
  for (const property in formAnswers) {
    let obj = {};
    obj['text'] = formAnswers[property];
    answers.push(obj);
  }

  formData.answers = answers;
  questionParams[number.toString()] = formData;

  return (
    <Formik initialValues={initialState}>
      {({ errors, touched }) => (
        <Form className='form'>
          <h2 className='text-dark'>Pytanie {number}</h2>
          <div className='form-group' onChange={getValues}>
            <p className='lead'>Treść</p>
            <Field
              type='text'
              component='textarea'
              name='text'
              placeholder='Treść zadania'
            />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <div className='form-group' onChange={getValues}>
            <p className='lead'>Czas na pytanie</p>
            <Field
              type='text'
              name='time'
              placeholder='Czas na pytanie w sekundach'
            />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Wzór 1</p>
            <Field name='answerA' type='text' placeholder='Odpowiedź A' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>

          {forms.map(e => (
            <>{e}</>
          ))}
          <button
            type='submit'
            disabled={isDisable}
            className='dashboard-button btn-primary'
            onClick={() => {
              setNumber(formNumber + 1);
              addForm();
            }}
          >
            Dodaj odpowiedź
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default OpenQuestionForm;
