import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactCountdownClock from 'react-countdown-clock';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));
const answers = [];
const Test = ({ test: { test, loading } }) => {
  const [counter, setCounter] = useState(
    parseInt(localStorage.getItem('time'))
  );

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        localStorage.setItem('time', counter.toString());
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
  const [questionNumber, setQuestionNumber] = useState(0);

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
                    <div className='counter'>
                      <ReactCountdownClock
                        seconds={counter}
                        color='#000'
                        alpha={0.9}
                        size={100}
                        onComplete={() => {
                          if (questionNumber + 1 == test.questions.length)
                            history.push('/tests');
                          else {
                            setCounter(10);
                            setQuestionNumber(questionNumber + 1);
                          }
                        }}
                      />
                    </div>

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
                    <div className='counter'>
                      <ReactCountdownClock
                        seconds={counter}
                        color='#000'
                        alpha={0.9}
                        size={100}
                        onComplete={() => {
                          if (questionNumber + 1 == test.questions.length)
                            history.push('/tests');
                          else {
                            setCounter(10);
                            setQuestionNumber(questionNumber + 1);
                          }
                        }}
                      />
                    </div>

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
            if (questionNumber + 1 == test.questions.length)
              history.push('/tests');
            else {
              setCounter(10);
              setQuestionNumber(questionNumber + 1);
            }

            console.log(answers);
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
