import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));

const TestResult = ({ test: { result, loading } }) => {
  const history = useHistory();
  const classes = useStyles();
  if (result) {
    return (
      <>
        <section className='container container-dashboard'>
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs>
                <button
                  className='dashboard-button profile-btn'
                  onClick={() => {
                    history.push('/tests');
                  }}
                >
                  <span className='back-icon'>
                    <ArrowBackIcon />
                  </span>{' '}
                  Testy
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'>GRATULACJE!</h2>
                    {result !== null && result.result !== '' ? (
                      <>
                        <h3 className='lead text-dark'>
                          Twój wynik: {result.result}
                        </h3>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </>
    );
  } else {
    return <div></div>;
  }
};
TestResult.propTypes = {
  auth: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  test: state.test
});
export default connect(mapStateToProps)(TestResult);
