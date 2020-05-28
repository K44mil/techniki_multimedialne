import React from 'react';
import Moment from 'react-moment';
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
import { deleteTask } from '../../actions/task';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = ({
  auth: { user = {}, dashboard = {}, loading, isAuthenticated }
}) => {
  const classes = useStyles();

  const showTaskButton = (
    <button className='dashboard-button'>
      {' '}
      {isAuthenticated && user !== null && user.role === 'student'
        ? 'Pokaż'
        : 'Sprawdź'}{' '}
    </button>
  );

  const deleteTaskButton = (
    <button
      className='dashboard-button'
      onClick={() => {
        setTimeout(() => {
          deleteTask(tableID.ID);
        }, 200);
      }}
    >
      Usuń
    </button>
  );

  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Nazwa',
    'Termin oddania',
    '',
    ''
  ];
  if (loading || (loading && dashboard === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  if (dashboard) {
    const myTasks = dashboard.todo.map(el => {
      return Object.keys(el).map(key => {
        if (key === '_id' || key === 'name' || key === 'expireAt') {
          return el[key];
        }
      });
    });

    const data = myTasks.map(el => {
      return el.filter(value => value !== undefined);
    });

    console.log(data);
    data.forEach(el => {
      el[el.length - 1] = (
        <Moment format='DD/MM/YYYY'>{el[el.length - 1]}</Moment>
      );
    });

    const dataButtons = data.map(el => {
      if (user !== null && user.role === 'teacher') {
        el.push(showTaskButton);
        el.push(deleteTaskButton);
        return el;
      } else if (user !== null) {
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
              <MUIDataTable
                title={
                  isAuthenticated && user !== null && user.role === 'student'
                    ? 'Zadania do zrobienia'
                    : 'Zadania do sprawdzenia'
                }
                data={dataButtons}
                columns={columns}
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
  task: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { deleteTask }
)(Dashboard);
