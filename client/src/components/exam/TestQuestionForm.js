import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const testQuestionSchema = Yup.object().shape({
  text: Yup.string().required('Podaj treść'),
  answerA: Yup.string().required('Podaj odpowiedź'),
  answerB: Yup.string().required('Podaj odpowiedź'),
  answerC: Yup.string().required('Podaj odpowiedź'),
  answerD: Yup.string().required('Podaj odpowiedź')
});

const TestQuestionForm = ({ initialState, number, questionParams }) => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false
  });

  const handleChange = event => {
    console.log(event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked);
    console.log(state);
  };

  const [formData, setFormData] = useState({
    text: '',
    type: 'z'
  });
  const [formAnswers, setFormAnswers] = useState({});
  const getValues = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getAnswers = e => {
    setFormAnswers({ ...formAnswers, [e.target.name]: e.target.value });
  };

  const [formNumber, setNumber] = useState(1);

  const MyForm = number => {
    if (number.number === 1) {
      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <Field
              name='answerD'
              type='text'
              placeholder='Odpowiedź D'
              value=''
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedD}
                // onChange={() => setState(!state.checkedD)}
                name='checkedD'
                color='primary'
                value=''
              />
            }
            label='Poprawna'
          />
        </>
      );
    } else if (number.number === 2) {
      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <Field
              name='answerE'
              type='text'
              placeholder='Odpowiedź E'
              value=''
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedE}
                onChange={() => console.log('lolo')}
                name='checkedE'
                color='primary'
                value=''
              />
            }
            label='Poprawna'
          />
        </>
      );
    } else return null;
  };
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

  let isCorrect = [];
  for (const property in state) {
    let obj = {};
    obj['isCorrect'] = state[property];
    isCorrect.push(obj);
  }

  let answers2 = [];
  for (let i = 0; i < answers.length; i++) {
    let obj2 = {};
    obj2 = { ...answers[i], ...isCorrect[i] };
    answers2.push(obj2);
  }
  formData.answers = answers2;
  questionParams[number.toString()] = formData;

  return (
    <Formik initialValues={initialState} validationSchema={testQuestionSchema}>
      {({ errors, touched }) => (
        <Form className='form'>
          <p>Pytanie {number}</p>
          <div className='form-group' onChange={getValues}>
            <Field
              type='text'
              component='textarea'
              name='text'
              placeholder='Treść zadania'
            />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <div className='form-group' onChange={getAnswers}>
            <Field name='answerA' type='text' placeholder='Odpowiedź A' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name='checkedA'
                color='primary'
              />
            }
            label='Poprawna'
          />
          <div className='form-group' onChange={getAnswers}>
            <Field name='answerB' type='text' placeholder='Odpowiedź B' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name='checkedB'
                color='primary'
              />
            }
            label='Poprawna'
          />
          <div className='form-group' onChange={getAnswers}>
            <Field name='answerC' type='text' placeholder='Odpowiedź C' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedC}
                onChange={handleChange}
                name='checkedC'
                color='primary'
              />
            }
            label='Poprawna'
          />
          {forms.map(e => (
            <>{e}</>
          ))}
          <button
            type='submit'
            className='dashboard-button btn-primary'
            onClick={() => {
              setNumber(formNumber + 1);
              addForm();
              // console.log(formNumber);
            }}
          >
            Dodaj odpowiedź
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default TestQuestionForm;
