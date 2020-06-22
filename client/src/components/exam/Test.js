import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactCountdownClock from 'react-countdown-clock';
import { checkTestResult } from '../../actions/test';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));
const answers = [];
let flaga = 1;
const Test = ({ test: { test, loading } }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [counter, setCounter] = useState(
    test && test.questions ? test.questions[questionNumber].time : 0
  );

  let check = function() {
    setTimeout(function() {
      if (loading) check();
      else {
        setCounter(test.questions[0].time);
        flaga = 0;
      }
    }, 500);
  };
  if (flaga) check();

  const dispatch = useDispatch();

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedF: false,
    checkedG: false
  });
  const [answerData, setAnswerData] = useState({
    answer: ''
  });
  const getAnswer = e => {
    setAnswerData({ ...answerData, [e.target.name]: e.target.value });
  };
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  if (loading || (loading && test === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <div className='box-post'>
              <div className='form-group'>
                {test &&
                test !== undefined &&
                test.questions !== undefined &&
                test.questions[questionNumber].type === 'z' ? (
                  <>
                    {' '}
                    {counter > 0 ? (
                      <div className='counter'>
                        <ReactCountdownClock
                          seconds={counter}
                          color='#000'
                          alpha={0.9}
                          size={100}
                          onComplete={() => {
                            if (questionNumber + 1 === test.questions.length) {
                              dispatch(checkTestResult(test._id, answers));
                              history.push('/testResult');
                            } else {
                              setQuestionNumber(questionNumber + 1);
                              setCounter(test.questions[questionNumber].time);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                    <h2 className='text-primary'>
                      {test.questions[questionNumber].text}
                    </h2>
                    <div class='line'></div>
                    <p className='lead'>Odpowiedzi</p>
                    {test.questions[questionNumber].answers.length === 3 ? (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedA}
                              onChange={handleChange}
                              name='checkedA'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[0].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChange}
                              name='checkedB'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[1].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedC}
                              onChange={handleChange}
                              name='checkedC'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[2].text}
                        />
                      </>
                    ) : test.questions[questionNumber].answers.length === 4 ? (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedA}
                              onChange={handleChange}
                              name='checkedA'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[0].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChange}
                              name='checkedB'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[1].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedC}
                              onChange={handleChange}
                              name='checkedC'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[2].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedD}
                              onChange={handleChange}
                              name='checkedD'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[3].text}
                        />
                      </>
                    ) : test.questions[questionNumber].answers.length === 5 ? (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedA}
                              onChange={handleChange}
                              name='checkedA'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[0].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedB}
                              onChange={handleChange}
                              name='checkedB'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[1].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedC}
                              onChange={handleChange}
                              name='checkedC'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[2].text}
                        />
                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedD}
                              onChange={handleChange}
                              name='checkedD'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[3].text}
                        />

                        <br />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={state.checkedE}
                              onChange={handleChange}
                              name='checkedE'
                              color='primary'
                            />
                          }
                          label={test.questions[questionNumber].answers[4].text}
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </>
                ) : test &&
                  test !== undefined &&
                  test.questions !== undefined &&
                  test.questions[questionNumber].type === 'o' ? (
                  <>
                    {counter > 0 ? (
                      <div className='counter'>
                        <ReactCountdownClock
                          seconds={counter}
                          color='#000'
                          alpha={0.9}
                          size={100}
                          onComplete={() => {
                            if (questionNumber + 1 === test.questions.length) {
                              dispatch(checkTestResult(test._id, answers));
                              history.push('/testResult');
                            } else {
                              setQuestionNumber(questionNumber + 1);
                              setCounter(test.questions[questionNumber].time);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      ''
                    )}

                    <h2 className='text-primary'>
                      {test.questions[questionNumber].text}
                    </h2>
                    <div class='line'></div>

                    <form className='form' onChange={getAnswer}>
                      <h2 className='text-primary'>Odpowiedź</h2>
                      <textarea
                        type='placeholder'
                        name='answer'
                        placeholder='Odpowiedź'
                      />
                    </form>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Grid>
        </Grid>
        <button
          className='dashboard-button btn-dark'
          onClick={() => {
            if (
              test.questions !== undefined &&
              test.questions[questionNumber].type === 'z'
            ) {
              const selected = [];
              if (state.checkedA) {
                selected.push(test.questions[questionNumber].answers[0]._id);
              }
              if (state.checkedB) {
                selected.push(test.questions[questionNumber].answers[1]._id);
              }
              if (state.checkedC) {
                selected.push(test.questions[questionNumber].answers[2]._id);
              }
              if (state.checkedD) {
                selected.push(test.questions[questionNumber].answers[3]._id);
              }
              if (state.checkedE) {
                selected.push(test.questions[questionNumber].answers[4]._id);
              }
              let id = test.questions[questionNumber]._id;
              answers.push({ id, selected });
            } else if (
              test.questions !== undefined &&
              test.questions[questionNumber].type === 'o'
            ) {
              let id = test.questions[questionNumber]._id;
              let answer = answerData.answer;
              answers.push({ answer, id });
            }
            if (questionNumber + 1 === test.questions.length) {
              dispatch(checkTestResult(test._id, answers));
              history.push('/testResult');
            } else {
              setQuestionNumber(questionNumber + 1);
              setCounter(test.questions[questionNumber + 1].time);
            }
          }}
          type='submit'
        >
          Następne pytanie
        </button>
      </div>
    </section>
  );
};

Test.propTypes = {
  test: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  test: state.test
});
export default connect(mapStateToProps)(Test);
