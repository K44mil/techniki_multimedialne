import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MUIDataTable from 'mui-datatables';
import {
  tableID,
  TableOptions
} from '../../shared/consts/TableOption.constants';
import {
  //   getTasks,
  deleteTask
} from '../../actions/task';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));

const Tasks = ({ task: { loading, tasks = [] }, deleteTask }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'Treść',
    'Data',
    ''
  ];
  //   useEffect(() => {
  //     dispatch(getNotifications());
  //   }, [dispatch]);

  //   if (loading || (loading && tasks === null)) {
  //     return (
  //       <div className='loader'>
  //         <CircularProgress />
  //       </div>
  //     );
  //   }
  //   if (tasks !== []) {
  // const deleteTaskButton = (
  //   <button
  //     className='dashboard-button'
  //     onClick={() => {
  //       setTimeout(() => {
  //         deleteTask(tableID.ID);
  //       }, 200);
  //     }}
  //   >
  //     Usuń
  //   </button>
  // );
  // const myNotifications = notifications.notifications.map(el => {
  //   return Object.keys(el).map(key => {
  //     if (key === 'notification' || key === '_id') {
  //       return el[key];
  //     }
  //   });
  // });
  // console.log(myNotifications);
  // const data = myNotifications.map(el => {
  //   return el.filter(value => value !== undefined);
  // });
  // const finalData = [];
  // for (let i = 0; i < data.length; i++) {
  //   const arr2 = []; //temporary array
  //   for (let j = 0; j < data[i].length; j++) {
  //     if (typeof data[i][j] === 'object') {
  //       arr2.push(
  //         data[i][j].text,
  //         <Moment format='DD/MM/YYYY'>{data[i][j].createdAt}</Moment>
  //       );
  //     } else arr2.push(data[i][j]);
  //   }
  //   finalData.push(arr2);
  // }
  // const data2 = finalData.map(el => {
  //   el.push(deleteNotificationButton);
  //   return el;
  // });
  // return (
  //   <section className='container container-dashboard'>
  //     <div className={classes.root}>
  //       <Grid container spacing={5}>
  //         <Grid item xs>
  //           <button
  //             className='dashboard-button profile-btn'
  //             onClick={() => history.push('/dashboard')}
  //           >
  //             <span className='back-icon'>
  //               <ArrowBackIcon />
  //             </span>{' '}
  //             Dashboard
  //           </button>
  //           <h2 className='text-primary'>Twoje zadania</h2>
  //           <MUIDataTable
  //             title='Powiadomienia'
  //             columns={columns}
  //             options={TableOptions}
  //             data={data2}
  //           />
  //         </Grid>
  //       </Grid>
  //     </div>
  //   </section>
  // );
  //   } else
  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Grid container spacing={5}>
          <Grid item xs>
            <button
              className='dashboard-button profile-btn'
              onClick={() => history.push('/dashboard')}
            >
              <span className='back-icon'>
                <ArrowBackIcon />
              </span>{' '}
              Dashboard
            </button>
            <h2 className='text-primary'>Twoje zadania</h2>
            <MUIDataTable
              title='Powiadomienia'
              columns={columns}
              options={TableOptions}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

Tasks.propTypes = {
  task: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task
});

export default connect(
  mapStateToProps,
  { deleteTask }
)(Tasks);
