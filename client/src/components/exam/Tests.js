import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Moment from 'react-moment';
import Menu from '../shared/Menu';
import PropTypes from 'prop-types';
import {
  getTests,
  getFinishedTests,
  getActiveTests,
  getTestById,
  getParticipantsDetails,
  getAllStudentTests,
  getStudentFinishedTests,
  getStudentTestById
} from '../../actions/test';
import {
  tableID,
  TableOptions
} from '../../shared/consts/TableOption.constants';
// import { getGroupById, deleteGroup } from '../../actions/group';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
//1-all tests 2-active tests 3-finished tests
let testFlag = 1;
let testFlagStudent = 2;
const Tests = ({ test: { tests, test, loading }, auth: { user } }) => {
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
      name: 'Nazwa test'
    },
    'Opis',
    'Data stworzenia',
    ''
  ];

  const columnsActive = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    {
      name: 'Liczba skończonych testów'
    },
    'Liczba uczestników',
    'Nazwa grupy',
    'Nazwa testu',
    ''
  ];

  const columnsStudent = [
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
    'Nazwa testy',
    'Nazwa grupy',
    ''
  ];

  useEffect(() => {
    if (user && user.role === 'teacher') dispatch(getTests());
    else if (user && user.role === 'student') dispatch(getAllStudentTests());
  }, [dispatch]);

  //   console.log(tests);

  if (loading || (loading && tests === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }

  if (tests) {
    const tableButton = (
      <button
        className='dashboard-button'
        onClick={() => {
          setTimeout(() => {
            testFlag === 1
              ? dispatch(getTestById(tableID.ID))
              : testFlag === 2
              ? dispatch(getParticipantsDetails(tableID.ID))
              : dispatch(getTestById(tableID.ID));
            testFlag === 1
              ? history.push('/examProfile')
              : testFlag === 2
              ? history.push('/testDetails')
              : history.push('/examProfile');
          }, 100);
        }}
      >
        Pokaż
      </button>
    );

    const studentTableButton = (
      <button
        className='dashboard-button'
        onClick={() => {
          setTimeout(() => {
            dispatch(getStudentTestById(tableID.ID));
            history.push('/test');
          }, 100);
        }}
      >
        Rozpocznij test
      </button>
    );
    if (testFlag === 1) {
    }
    const myTests = tests.map(el => {
      return Object.keys(el).map(key => {
        if (user && user.role === 'teacher') {
          if (testFlag === 1 || testFlagStudent === 1) {
            if (
              key === 'name' ||
              key === 'description' ||
              key === '_id' ||
              key === 'createdAt'
            )
              return el[key];
          } else if (testFlag === 2 || testFlagStudent === 2) {
            if (
              key === 'groupName' ||
              key === 'testName' ||
              key === '_id' ||
              key === 'numberOfCompleted' ||
              key === 'numberOfParticipants'
            )
              return el[key];
          }
        } else if (user && user.role === 'student') {
          if (testFlagStudent === 1) {
            if (
              key === 'name' ||
              key === 'description' ||
              key === '_id' ||
              key === 'createdAt'
            )
              return el[key];
          } else if (testFlagStudent === 2 || testFlagStudent === 3) {
            if (
              key === 'groupName' ||
              key === 'testName' ||
              key === '_id' ||
              key === 'status' ||
              key === 'result'
            )
              return el[key];
          }
        }
      });
    });
    const data = myTests.map(el => {
      return el.filter(value => value !== undefined);
    });
    if (
      (user.role === 'teacher' && testFlag === 1) ||
      (user.role === 'student' && testFlagStudent === 1)
    ) {
      data.forEach(el => {
        el[el.length - 1] = (
          <Moment format='DD/MM/YYYY'>{el[el.length - 1]}</Moment>
        );
      });
    }

    console.log(data);

    const data2 = data.map(el => {
      if (user !== null && user.role === 'teacher') {
        el.push(tableButton);
      } else if (
        user &&
        user.role === 'student' &&
        testFlagStudent === 2 &&
        el[1] === 'Nierozpoczęty'
      )
        el.push(studentTableButton);
      return el;
    });

    return (
      <section className='container container-dashboard'>
        <div className={classes.root}>
          <Menu />
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <h1 className='large large-test text-primary'>Twoje testy</h1>
            </Grid>
            {user && user.role === 'teacher' ? (
              <>
                <Grid item xs={12} sm={4}>
                  <button
                    className='btn-primary dashboard-button'
                    onClick={() => {
                      testFlag = 2;
                      dispatch(getActiveTests());
                    }}
                  >
                    Aktywne testy
                  </button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <button
                    className='btn-orange dashboard-button'
                    onClick={() => {
                      testFlag = 3;
                      dispatch(getFinishedTests());
                    }}
                  >
                    Skończone testy
                  </button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <button
                    className='btn-success dashboard-button'
                    onClick={() => {
                      testFlag = 1;

                      dispatch(getTests());
                    }}
                  >
                    Wszystkie testy
                  </button>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <button
                    className='btn-orange dashboard-button'
                    onClick={() => {
                      testFlagStudent = 3;
                      dispatch(getStudentFinishedTests());
                    }}
                  >
                    Skończone testy
                  </button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <button
                    className='btn-success dashboard-button'
                    onClick={() => {
                      testFlagStudent = 2;
                      dispatch(getAllStudentTests());
                    }}
                  >
                    Wszystkie testy
                  </button>
                </Grid>
              </>
            )}

            <Grid item xs>
              {}
              <MUIDataTable
                title='Twoje testy'
                data={
                  (user && user.role === 'teacher') ||
                  (user.role === 'student' && testFlagStudent === 2)
                    ? data2
                    : data
                }
                columns={
                  testFlag === 1 && user && user.role === 'teacher'
                    ? columns
                    : testFlag === 2 && user && user.role === 'teacher'
                    ? columnsActive
                    : (testFlagStudent === 2 || testFlagStudent === 3) &&
                      user &&
                      user.role === 'student'
                    ? columnsStudent
                    : columns
                }
                options={TableOptions}
              />
            </Grid>
          </Grid>
        </div>
      </section>
    );
  } else {
    return (
      <section className='container container-dashboard'>
        <div className={classes.root}>
          <Menu />
          <Grid container spacing={5}>
            <Grid item xs>
              <h1 className='large text-primary'>Twoje testy</h1>
              <MUIDataTable
                title='Twoje testy'
                columns={columns}
                options={TableOptions}
              />
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
};

Tests.propTypes = {
  test: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  test: state.test
});

export default connect(mapStateToProps)(Tests);
