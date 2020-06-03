import React, { useEffect, useRef, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CircularProgress } from '@material-ui/core';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {
  getTaskById,
  downloadFile,
  sendSolution,
  getTaskSolutionById
} from '../../actions/task';
import { createRate } from '../../actions/rate';
import { Modal } from '../shared/Modal';
import CreateSolutionForm, { files } from './CreateSolutionForm';
import CreateRateForm from './CreateRateForm';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));

const TaskProfile = ({
  task: { loading, task },
  auth: { user = {} },
  getTaskById,
  getTaskSolutionById,
  downloadFile,
  sendSolution,
  createRate
}) => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const sendForm = useRef(null);
  useEffect(
    task => {
      if (
        task !== null &&
        task !== undefined &&
        user !== null &&
        user.role === 'student'
      ) {
        dispatch(getTaskById(task.data._id));
      } else if (
        task !== null &&
        task !== undefined &&
        user !== null &&
        user.role === 'teacher'
      ) {
        dispatch(getTaskSolutionById(task.data._id));
      }
    },
    [dispatch]
  );

  const [sendOpen, setSendOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleSendModal = () => {
    setSendOpen(!sendOpen);
  };

  const handleCreateModal = () => {
    setCreateOpen(!createOpen);
  };

  const handleSend = (values, actions) => {
    // const myFiles = files.filter(isEmpty);
    console.log(task._id);
    const data = {
      id: task._id,
      text: values.text,
      files: files.file
    };
    dispatch(sendSolution(data));
    actions.resetForm({});
    setSendOpen(!sendOpen);
  };

  const handleCreate = (values, actions) => {
    const data = {
      id: task._id,
      value: values.value,
      comment: values.comment
    };
    dispatch(createRate(data));
    actions.resetForm({});
    setCreateOpen(!createOpen);
  };

  const sendFormProps = {
    initialState: {
      text: '',
      files: ''
    },
    setRef: sendForm,
    handleSubmit: (values, actions) => {
      handleSend(values, actions);
    }
  };

  const createFormProps = {
    initialState: {
      values: '',
      comment: ''
    },
    setRef: sendForm,
    handleSubmit: (values, actions) => {
      handleCreate(values, actions);
    }
  };
  if (loading && task === null) {
    return <Redirect to='/dashboard' />;
  } else if (loading) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  } else if (!loading && task === null) {
    return <Redirect to='/dashboard' />;
  }
  if (user !== null && user.role === 'student') {
    return (
      <>
        <Modal
          open={sendOpen}
          onClose={handleSendModal}
          onClickSubmit={handleSendModal}
          title='Wyślij rozwiązanie'
          dialogContent={<CreateSolutionForm {...sendFormProps} />}
          maxWidth='sm'
          labelPrimary='Zakończ'
          dividers
          fullWidth
        />

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
                <button
                  className='dashboard-button task-btn'
                  onClick={handleSendModal}
                >
                  <span className='back-icon'>{/* <AssignmentIcon /> */}</span>{' '}
                  Wyślij rozwiązanie
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'>
                      {task !== null ? task.name : ''}
                    </h2>
                    <div className='line'></div>
                    {task !== null && task.description !== '' ? (
                      <>
                        <h3 className='text-dark'>Opis</h3>
                        <p>{task.description}</p>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.createdAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data stworzenia</h3>
                        <Moment format='DD/MM/YYYY'>{task.createdAt}</Moment>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.expireAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data końcowa</h3>
                        <Moment format='DD/MM/YYYY'>{task.expireAt}</Moment>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.files !== [] ? (
                      <>
                        <h3 className='text-dark'>Pliki</h3>
                        {task.files.map(el => {
                          return (
                            <div>
                              <a
                                href
                                onClick={() => downloadFile(el._id, el.name)}
                                download
                              >
                                {el.name}
                              </a>
                            </div>
                          );
                        })}
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
    return (
      <>
        <Modal
          open={createOpen}
          onClose={handleCreateModal}
          onClickSubmit={handleCreateModal}
          title='Wyślij rozwiązanie'
          dialogContent={<CreateRateForm {...createFormProps} />}
          maxWidth='sm'
          labelPrimary='Zakończ'
          dividers
          fullWidth
        />
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
                <button
                  className='dashboard-button task-btn'
                  onClick={handleCreateModal}
                >
                  <span className='back-icon'>{/* <AssignmentIcon /> */}</span>{' '}
                  Wystaw ocenę
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'>
                      {task !== null ? task.taskName : ''}
                    </h2>
                    <div className='line'></div>
                    {task !== null && task.taskCreatedAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data stworzenia zadania</h3>
                        <Moment format='DD/MM/YYYY'>
                          {task.taskCreatedAt}
                        </Moment>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.taskExpireAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data końcowa</h3>
                        <Moment format='DD/MM/YYYY'>{task.taskExpireAt}</Moment>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.text ? (
                      <>
                        <h3 className='text-dark'>Opis</h3>
                        <p>{task.text}</p>
                      </>
                    ) : (
                      ''
                    )}
                    {task !== null && task.files !== [] ? (
                      <>
                        <h3 className='text-dark'>Pliki</h3>
                        {
                          <div>
                            <a
                              href
                              onClick={() =>
                                downloadFile(task.file, task.fileName)
                              }
                              download
                            >
                              {task.fileName}
                            </a>
                          </div>
                        }
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
  }
};

TaskProfile.propTypes = {
  task: PropTypes.object.isRequired,
  getTaskById: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
  sendSolution: PropTypes.func.isRequired,
  getTaskSolutionById: PropTypes.func.isRequired,
  rate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getTaskById, downloadFile, sendSolution, getTaskSolutionById, createRate }
)(TaskProfile);
