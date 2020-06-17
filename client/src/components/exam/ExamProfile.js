import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TestQuestionForm from './TestQuestionForm';
import OpenQuestionForm from './OpenQuestionForm';
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
  const history = useHistory();
  const createForm = useRef(null);
  const classes = useStyles();
  const [questionNumber, setNumber] = useState(1);
  // const testQuestions = {};
  const questionCreateProps = {
    initialState: {
      text: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
      answerE: ''
    },
    setRef: createForm
  };

  //for title and description
  const [titleData, setTitleData] = useState({
    title: '',
    description: ''
  });
  const getTitle = e => {
    setTitleData({ ...titleData, [e.target.name]: e.target.value });
  };

  const allQuestions = {
    name: titleData.title,
    description: titleData.description,
    questions: []
  };
  const [isDisable, setDisabled] = useState(true);

  //only component with forms
  const [questions, setQuestion] = useState([]);
  const addQuestion = () => {
    setDisabled(false);
    setQuestion(prev => [
      ...prev,
      <TestQuestionForm
        {...questionCreateProps}
        number={questionNumber}
        questionParams={testQuestions}
      />
    ]);
  };
  const [openQuestions, setOpenQuestion] = useState([]);
  const addOpenQuestion = () => {
    setDisabled(false);
    setOpenQuestion(prev => [
      ...prev,
      <OpenQuestionForm
        {...questionCreateProps}
        number={questionNumber}
        questionParams={testQuestions}
      />
    ]);
  };

  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <div className='form-group'>
              <form className='form' onChange={getTitle}>
                <h2 className='text-primary'>Nazwa testu</h2>
                <input type='text' name='title' required placeholder='Tytuł' />
                <h2 className='text-primary'>Opis</h2>
                <textarea
                  type='placeholder'
                  name='description'
                  placeholder='Opis'
                />
              </form>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <button
              className='btn-primary dashboard-button'
              onClick={() => {
                setNumber(questionNumber + 1);
                addOpenQuestion();
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
              {openQuestions.map(e => (
                <>{e}</>
              ))}
            </div>
          </Grid>
        </Grid>
        <button
          disabled={isDisable}
          className='dashboard-button btn-dark'
          onClick={() => {
            for (const props in testQuestions) {
              let obj = {};
              obj = testQuestions[props];
              allQuestions.questions.push(obj);
            }
            createTest(allQuestions);
            history.push('/dashboard');
          }}
          type='submit'
        >
          Stwórz test
        </button>
      </div>
    </section>
  );
};
ExamProfile.propTypes = {
  createTest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createTest }
)(ExamProfile);
