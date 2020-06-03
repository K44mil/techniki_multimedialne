import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  TableOptions,
  tableID
} from '../../shared/consts/TableOption.constants';
import { getRates } from '../../actions/rate';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const RateProfile = ({
  rate: { rates, loading },
  auth: { user = {} },
  getRates
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(() => getRates());
  }, [dispatch]);
  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Ocena',
    'Komentarz',
    'Data wystawienia',
    'Nazwa zadania'
  ];

  const teacherColumns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Ocena',
    'Komentarz',
    'Data wystawienia',
    'Nazwa zadania',
    'E-mail studenta',
    ''
  ];

  console.log(rates);

  if (loading || (loading && rates === [])) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  if (rates) {
    const myRates = {};
    if (user !== null && user.role === 'student') {
      myRates.myRate = rates.map(el => {
        return Object.keys(el).map(key => {
          if (
            key === '_id' ||
            key === 'value' ||
            key === 'comment' ||
            key === 'createdAt' ||
            key === 'taskName'
          ) {
            return el[key];
          }
        });
      });
    } else {
      myRates.myRate = rates.map(el => {
        return Object.keys(el).map(key => {
          if (
            key === '_id' ||
            key === 'value' ||
            key === 'comment' ||
            key === 'createdAt' ||
            key === 'taskName' ||
            key === 'studentEmail'
          ) {
            return el[key];
          }
        });
      });
    }
    console.log(myRates.myRate);

    const data = myRates.myRate.map(el => {
      return el.filter(value => value !== undefined);
    });
    console.log(data);

    if (user !== null && user.role === 'student') {
      data.forEach(el => {
        el[el.length - 2] = (
          <Moment format='DD/MM/YYYY'>{el[el.length - 2]}</Moment>
        );
      });
    } else {
      data.forEach(el => {
        el[el.length - 3] = (
          <Moment format='DD/MM/YYYY'>{el[el.length - 3]}</Moment>
        );
      });
    }

    return (
      <section className='container container-dashboard'>
        <div className={classes.root}>
          <Grid container spacing={5}>
            <Grid item xs>
              <h1 className='large text-primary'>
                {user !== null && user.role === 'student'
                  ? 'Twoje oceny'
                  : 'Wystawione oceny'}
              </h1>
              <button
                className='dashboard-button profile-btn'
                onClick={() => history.push('/dashboard')}
              >
                <span className='back-icon'>
                  <ArrowBackIcon />
                </span>
                Dashboard
              </button>
              <MUIDataTable
                title={
                  user !== null && user.role === 'student'
                    ? 'Twoje oceny'
                    : 'Wystawione oceny'
                }
                columns={
                  user !== null && user.role === 'student'
                    ? columns
                    : teacherColumns
                }
                data={data}
                options={TableOptions}
              />
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
};

RateProfile.propTypes = {
  rate: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getRates: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  rate: state.rate
});
export default connect(
  mapStateToProps,
  { getRates }
)(RateProfile);
