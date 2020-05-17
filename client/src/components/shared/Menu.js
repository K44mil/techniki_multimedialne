import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import { Modal } from '../shared/Modal';
import GroupForm from '../dashboard/GroupForm';
import { addGroup } from '../../actions/group';

const Menu = ({
  auth: { user = {}, dashboard = {}, isAuthenticated },
  addGroup
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

  const studentButton = (
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

  const teacherButton = (
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
                ? studentButton
                : teacherButton}
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
              <Grid item xs={12} sm={12}>
                <button
                  className='dashboard-button'
                  type='submit'
                  onClick={() => history.push('/dashboard')}
                >
                  Sprawdź zadania
                </button>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs>
          <div className='dashboard-box box-secondary'>
            <h1>Wiadomości</h1>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <EmailIcon fontSize='large' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <p className='p-dashboard'>
                  {' '}
                  {dashboard !== null ? dashboard.messagesCount : 0}
                </p>
              </Grid>
              <Grid item xs={12} sm={12}>
                <button className='dashboard-button' type='submit'>
                  Sprawdź wiadomości
                </button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

Menu.propTypes = {
  auth: PropTypes.object.isRequired,
  addGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addGroup }
)(Menu);
