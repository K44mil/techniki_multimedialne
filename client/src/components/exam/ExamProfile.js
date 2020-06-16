import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TestQuestionForm from './TestQuestionForm';
import { createTest } from '../../actions/test';
// import { questionParams } from './TestQuestionForm';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));
//all data stuf
let testQuestions = {};
const ExamProfile = ({ createTest }) => {
  const createForm = useRef(null);
  const classes = useStyles();
  const [questionNumber, setNumber] = useState(1);
  // const testQuestions = {};
  const questionCreateProps = {
    initialState: {
      text: '',
      answerA: '',
      answerB: '',
      answerC: ''
    },
    setRef: createForm
  };
  const allQuestions = {
    name: 'Test',
    description: 'lolol'
  };
  allQuestions.questions = testQuestions;

  //only component with forms
  const [questions, setQuestion] = useState([]);
  const addQuestion = () => {
    setQuestion(prev => [
      ...prev,
      <TestQuestionForm
        {...questionCreateProps}
        number={questionNumber}
        questionParams={testQuestions}
      />
    ]);
  };

  // console.log(questionParams);
  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <button
              className='btn-primary dashboard-button'
              onClick={() => {
                setNumber(questionNumber + 1);
              }}
            >
              Stwórz pytanie otwarte
            </button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <button
              className='btn-orange dashboard-button'
              onClick={() => {
                addQuestion();
                setNumber(questionNumber + 1);
              }}
            >
              Stwórz pytanie zamknięte
            </button>
          </Grid>
          <Grid item xs>
            <div className='container-profile'>
              {questions.map(e => (
                <>{e}</>
              ))}
            </div>
          </Grid>
        </Grid>
        <button
          onClick={() => {
            createTest(allQuestions);
          }}
          type='submit'
        >
          lololo
        </button>
      </div>
    </section>
  );
};
ExamProfile.propTypes = {
  createTest: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });
export default connect({ createTest })(ExamProfile);
