import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';
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
    checkedC: false
  });

  //for checkbox
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
  //button for adding questions
  const [isDisable, setDisabled] = useState(false);
  //for additional questions
  const MyForm = number => {
    const [state2, setState2] = React.useState({
      checkedD: false,
      checkedE: false
    });
    const handleChange2 = event => {
      setState2({ ...state2, [event.target.name]: event.target.checked });
    };
    setState({ ...state, ...state2 });

    if (number.number === 1) {
      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Odpowiedź D</p>
            <Field name='answerD' type='text' placeholder='Odpowiedź D' />
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state2.checkedD}
                  onChange={handleChange2}
                  name='checkedD'
                  color='primary'
                  value='checkedD'
                />
              }
              label='Poprawna'
            />
          </FormGroup>
        </>
      );
    } else if (number.number === 2) {
      setDisabled(true);

      return (
        <>
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Odpowiedź E</p>
            <Field name='answerE' type='text' placeholder='Odpowiedź E' />
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state2.checkedE}
                  onChange={handleChange2}
                  name='checkedE'
                  color='primary'
                  value='checkedE'
                />
              }
              label='Poprawna'
            />
          </FormGroup>
        </>
      );
    } else if (number.number === 2)
      document.getElementsByName('addButton').disabled = true;
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

  let isCorrect = [];

  for (const property in state) {
    let obj = {};
    obj['isCorrect'] = state[property];
    isCorrect.push(obj);
  }

  // console.log(boxState);
  // isCorrect.concat(boxState);
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
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Odpowiedź A</p>
            <Field name='answerA' type='text' placeholder='Odpowiedź A' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name='checkedA'
                value='checkedA'
                color='primary'
              />
            }
            label='Poprawna'
          />
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Odpowiedź B</p>
            <Field name='answerB' type='text' placeholder='Odpowiedź B' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name='checkedB'
                value='checkedB'
                color='primary'
              />
            }
            label='Poprawna'
          />
          <div className='form-group' onChange={getAnswers}>
            <p className='lead'>Odpowiedź C</p>
            <Field name='answerC' type='text' placeholder='Odpowiedź C' />
            {errors.value && touched.value ? <div>{errors.value}</div> : null}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedC}
                onChange={handleChange}
                name='checkedC'
                value='checkedC'
                color='primary'
              />
            }
            label='Poprawna'
          />
          {forms.map(e => (
            <>{e}</>
          ))}
          <button
            disabled={isDisable}
            type='submit'
            name='addButton'
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
export default TestQuestionForm;
