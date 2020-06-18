import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getGroups } from '../../actions/group';
import { getParticipantsDetails } from '../../actions/test';
import MUIDataTable from 'mui-datatables';
import { CircularProgress } from '@material-ui/core';
import {
  tableID,
  TableOptions
} from '../../shared/consts/TableOption.constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));
export const groupId = {};
const ActiveTestDetails = ({ test: { details, loading } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    {
      name: 'Status Testu'
    },
    'Rezultat',
    ''
  ];
  if (details && details !== undefined && details.details !== undefined) {
    localStorage.setItem('testDetailsId', details.details[0].activeTestId);
  }

  useEffect(() => {
    if (loading) {
      dispatch(getParticipantsDetails(localStorage.getItem('testDetailsId')));
    }
  }, [loading]);

  if (loading) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  if (
    details !== undefined &&
    details !== null &&
    details.details !== undefined
  ) {
    const results = details.details.map(el => {
      return Object.keys(el).map(key => {
        if (key === 'status' || key === 'result' || key === '_id') {
          return el[key];
        }
      });
    });

    const data = results.map(el => {
      return el.filter(value => value !== undefined);
    });
    console.log(data);

    return (
      <>
        <section className='container container-dashboard'>
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs>
                <button
                  className='dashboard-button profile-btn'
                  onClick={() => {
                    localStorage.removeItem('testId');
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
                    <h2 className='text-primary'>
                      {details !== null ? details.testName : ''}
                    </h2>
                    {details !== null && details.description !== '' ? (
                      <>
                        <h3 className='text-dark'>Grupa</h3>
                        <p>{details.groupName}</p>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <h2 className='text-primary'>Szczegóły testów</h2>
                {details && details.details !== undefined ? (
                  <MUIDataTable
                    options={TableOptions}
                    title='Szczegóły testów'
                    columns={columns}
                    data={data}
                  />
                ) : (
                  <MUIDataTable
                    title='szczegóły testów'
                    columns={columns}
                    options={TableOptions}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className='container container-dashboard'>
          <div className={classes.root}>
            <Grid container spacing={5}>
              <Grid item xs>
                <button
                  className='dashboard-button profile-btn'
                  onClick={() => {
                    localStorage.removeItem('testDetailsId');
                    history.push('/tests');
                  }}
                >
                  <span className='back-icon'>
                    <ArrowBackIcon />
                  </span>{' '}
                  Test
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'></h2>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </>
    );
  }
};

ActiveTestDetails.propTypes = {
  details: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  test: PropTypes.object.isRequired,
  getParticipantsDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  test: state.test
});
export default connect(
  mapStateToProps,
  { getParticipantsDetails }
)(ActiveTestDetails);
