import React from 'react';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import Menu from '../shared/Menu';
import {
  TableOptions,
  tableID
} from '../../shared/consts/TableOption.constants';
import { getTaskById, getTaskSolutionById } from '../../actions/task';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = ({
  auth: { user = {}, dashboard = {}, loading, isAuthenticated },
  getTaskById,
  getTaskSolutionById
}) => {
  const classes = useStyles();
  const history = useHistory();

  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Nazwa',
    'Termin oddania',
    ''
  ];

  const teacherColumns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Termin wysłania',
    'Imię',
    'Nazwisko',
    'E-mail',
    ''
  ];
  if (localStorage.getItem('groupId')) localStorage.removeItem('groupId');
  if (localStorage.getItem('listening')) localStorage.removeItem('listening');
  if (localStorage.getItem('groupName')) localStorage.removeItem('groupName');
  if (loading || (loading && dashboard === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  if (dashboard) {
    const showTaskButton = (
      <button
        className='dashboard-button'
        onClick={
          isAuthenticated && user !== null && user.role === 'student'
            ? () => {
                setTimeout(() => {
                  getTaskById(tableID.ID);
                  history.push('/taskProfile');
                }, 100);
              }
            : () => {
                setTimeout(() => {
                  getTaskSolutionById(tableID.ID);
                  history.push('/taskProfile');
                }, 100);
              }
        }
      >
        {' '}
        {isAuthenticated && user !== null && user.role === 'student'
          ? 'Pokaż'
          : 'Sprawdź'}{' '}
      </button>
    );
    const myTasks = {};
    if (user !== null && user.role === 'student') {
      myTasks.myTask = dashboard.todo.map(el => {
        return Object.keys(el).map(key => {
          if (key === '_id' || key === 'name' || key === 'expireAt') {
            return el[key];
          }
        });
      });
    } else {
      myTasks.myTask = dashboard.todo.map(el => {
        return Object.keys(el).map(key => {
          if (
            key === '_id' ||
            key === 'createdAt' ||
            key === 'userFirstName' ||
            key === 'userLastName' ||
            key === 'userEmail'
          ) {
            return el[key];
          }
        });
      });
    }

    const data = myTasks.myTask.map(el => {
      return el.filter(value => value !== undefined);
    });

    if (user !== null && user.role === 'student') {
      data.forEach(el => {
        el[el.length - 1] = (
          <Moment format='DD/MM/YYYY'>{el[el.length - 1]}</Moment>
        );
      });
    } else {
      data.forEach(el => {
        el[1] = <Moment format='DD/MM/YYYY'>{el[1]}</Moment>;
      });
    }

    const dataButtons = data.map(el => {
      if (user !== null) {
        el.push(showTaskButton);
        return el;
      }
    });
    return (
      <section className='container container-dashboard'>
        <div className={classes.root}>
          <Menu />
          <Grid container spacing={5}>
            <Grid item xs>
              <h1 className='large text-primary'>
                {' '}
                {isAuthenticated && user !== null && user.role === 'student'
                  ? 'Zadania do zrobienia'
                  : 'Zadania do sprawdzenia'}{' '}
              </h1>
              {user !== null && user.role === 'teacher' ? (
                <button
                  className='dashboard-button profile-btn'
                  onClick={() => history.push('/rateProfile')}
                >
                  <span className='back-icon'>{/* <PersonAddIcon /> */}</span>{' '}
                  Wystawione oceny
                </button>
              ) : null}
              <MUIDataTable
                title={
                  isAuthenticated && user !== null && user.role === 'student'
                    ? 'Zadania do zrobienia'
                    : 'Zadania do sprawdzenia'
                }
                data={dataButtons}
                columns={
                  isAuthenticated && user !== null && user.role === 'student'
                    ? columns
                    : teacherColumns
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
              <h1 className='large text-primary'>
                {' '}
                {isAuthenticated && user !== null && user.role === 'student'
                  ? 'Zadania do zrobienia'
                  : 'Zadania do sprawdzenia'}{' '}
              </h1>
              <MUIDataTable
                title={
                  isAuthenticated && user !== null && user.role === 'student'
                    ? 'Zadania do zrobienia'
                    : 'Zadania do sprawdzenia'
                }
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getTaskById: PropTypes.func.isRequired,
  getTaskSolutionById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getTaskById, getTaskSolutionById }
)(Dashboard);
