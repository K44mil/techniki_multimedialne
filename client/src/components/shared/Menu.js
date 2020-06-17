import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import WorkIcon from '@material-ui/icons/Work';
import { Modal } from '../shared/Modal';
import GroupForm from '../dashboard/GroupForm';
import { addGroup } from '../../actions/group';
import { getRates } from '../../actions/rate';
const Menu = ({
  auth: { user = {}, dashboard = {}, isAuthenticated },
  addGroup,
  getRates
}) => {
  const addForm = useRef(null);
  const history = useHistory();

  const routeChange = () => {
    let path = `/groups`;
    history.push(path);
  };

  const [addOpen, setAddOpen] = useState(false);

  const handleAddModal = () => {
    setAddOpen(!addOpen);
  };

  const studentButtonGroups = (
    <Grid item xs={12} sm={12}>
      <button
        className='dashboard-button'
        type='submit'
        onClick={() => {
          routeChange();
        }}
      >
        Twoje grupy
      </button>
    </Grid>
  );

  const teacherButtonGroups = (
    <>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={handleAddModal}
        >
          Nowa grupa
        </button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => {
            routeChange();
          }}
        >
          Twoje grupy
        </button>
      </Grid>
    </>
  );

  const studentButtonTasks = (
    <>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => history.push('/dashboard')}
        >
          Twoje zadania
        </button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => {
            getRates();
            history.push('/rateProfile');
          }}
        >
          Twoje oceny
        </button>
      </Grid>
    </>
  );

  const teacherButtonTasks = (
    <>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => history.push('/tasks')}
        >
          Twoje zadania
        </button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => history.push('/dashboard')}
        >
          Do oceny
        </button>
      </Grid>
    </>
  );

  const studentButtonTests = (
    <Grid item xs={12} sm={12}>
      <button
        className='dashboard-button'
        type='submit'
        onClick={() => history.push('/tests')}
      >
        Twoje testy
      </button>
    </Grid>
  );

  const teacherButtonTests = (
    <>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => history.push('/examProfile')}
        >
          Stwórz test
        </button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <button
          className='dashboard-button'
          type='submit'
          onClick={() => history.push('/tests')}
        >
          Twoje testy
        </button>
      </Grid>
    </>
  );
  const addFormProps = {
    initialState: {
      name: '',
      description: ''
    },
    setRef: addForm,
    handleSubmit: (values, actions) => {
      addGroup(values);
      actions.resetForm({});
    }
  };

  return (
    <>
      <Modal
        open={addOpen}
        onClose={handleAddModal}
        onClickSubmit={handleAddModal}
        title='Utwórz grupę'
        dialogContent={<GroupForm {...addFormProps} />}
        maxWidth='sm'
        labelPrimary='Zakończ'
        dividers
        fullWidth
      />

      <Grid container spacing={5}>
        <Grid item xs>
          <div className='dashboard-box'>
            <h1>Moje grupy</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <GroupIcon fontSize='large' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className='p-dashboard'>
                  {dashboard !== null ? dashboard.groupsCount : 0}
                </p>
              </Grid>
              {isAuthenticated && user !== null && user.role === 'student'
                ? studentButtonGroups
                : teacherButtonGroups}
            </Grid>
          </div>
        </Grid>

        <Grid item xs>
          <div className='dashboard-box box-primary'>
            <h1>Powiadomienia</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <NotificationsIcon fontSize='large' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className='p-dashboard'>
                  {' '}
                  {dashboard !== null ? dashboard.notificationsCount : 0}
                </p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <button
                  className='dashboard-button'
                  type='submit'
                  onClick={() => history.push('/notifications')}
                >
                  Sprawdź powiadomienia
                </button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs>
          <div className='dashboard-box box-third'>
            <h1>Moje zdania</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <WorkIcon fontSize='large' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className='p-dashboard'>
                  {' '}
                  {dashboard !== null ? dashboard.todo.length : 0}
                </p>
              </Grid>

              {isAuthenticated && user !== null && user.role === 'student'
                ? studentButtonTasks
                : teacherButtonTasks}
            </Grid>
          </div>
        </Grid>
        <Grid item xs>
          <div className='dashboard-box box-secondary'>
            <h1>Testy</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormatListNumberedIcon fontSize='large' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className='p-dashboard'>
                  {' '}
                  {dashboard !== null ? dashboard.messagesCount : 0}
                </p>
              </Grid>
              {isAuthenticated && user !== null && user.role === 'student'
                ? studentButtonTests
                : teacherButtonTests}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
  addGroup: PropTypes.func.isRequired,
  getRates: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addGroup, getRates }
)(Menu);
