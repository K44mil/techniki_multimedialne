import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ChatIcon from '@material-ui/icons/Chat';
import { getGroupById, addStudent, deleteStudent } from '../../actions/group';
import MUIDataTable from 'mui-datatables';
import { CircularProgress } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Modal } from '../shared/Modal';
import {
  tableID,
  TableOptions
} from '../../shared/consts/TableOption.constants';
import AddStudentForm from '../dashboard/AddStudentForm';
import CreateTaskForm, { files } from '../dashboard/CreateTaskForm';
import { createTask } from '../../actions/task';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  }
}));
export const groupId = {};
const GroupProfile = ({
  group: { group, loading },
  auth: { user },
  getGroupById,
  addStudent,
  deleteStudent,
  createTask
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const addForm = useRef(null);
  const createForm = useRef(null);
  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    'E-mail',
    'Imię',
    'Nazwisko',
    ''
  ];
  if (group && group !== undefined)
    localStorage.setItem('groupId', group.data._id);
  console.log(localStorage.getItem('groupId'));

  useEffect(
    group => {
      if (group !== null && group !== undefined) {
        dispatch(getGroupById(group.data.id));
      }
    },
    [dispatch, getGroupById]
  );

  const [addOpen, setAddOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleAddModal = () => {
    setAddOpen(!addOpen);
  };

  const handleCreateModal = () => {
    setCreateOpen(!createOpen);
    files.length = 0;
  };

  const handleAdd = (values, actions) => {
    const data = {
      id: group.data._id,
      email: values.email
    };
    dispatch(addStudent(data));
    actions.resetForm({});
    setAddOpen(!addOpen);
  };

  const isEmpty = file => {
    return file !== '';
  };

  const handleCreate = (values, actions) => {
    const myFiles = files.filter(isEmpty);

    const data = {
      name: values.name,
      description: values.description,
      expireDate: values.expireDate,
      files: myFiles,
      groupId: group.data._id
    };
    dispatch(createTask(data));
    actions.resetForm({});
    setCreateOpen(!createOpen);
  };

  const addFormProps = {
    initialState: {
      email: ''
    },
    setRef: addForm,
    handleSubmit: (values, actions) => {
      handleAdd(values, actions);
    }
  };

  const addCreateProps = {
    initialState: {
      name: '',
      description: '',
      expireDate: '',
      files: []
    },
    setRef: createForm,
    handleSubmit: (values, actions) => {
      handleCreate(values, actions);
    }
  };

  if (loading || (loading && group === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  } else if (!loading && group === null) {
    return <Redirect to='/groups' />;
  }

  const myStudents = group.data.members.map(el => {
    return Object.keys(el).map(key => {
      if (
        key === 'firstName' ||
        key === 'lastName' ||
        key === 'email' ||
        key === '_id'
      ) {
        return el[key];
      }
    });
  });

  const deleteStudentButton = (
    <button
      className='dashboard-button'
      onClick={() => {
        setTimeout(() => {
          deleteStudent(group.data._id, tableID.ID);
        }, 200);
      }}
    >
      Usuń
    </button>
  );

  const data = myStudents.map(el => {
    return el.filter(value => value !== undefined);
  });

  const data2 = data.map(el => {
    if (user !== null && user.role === 'teacher') {
      el.push(deleteStudentButton);
    }
    return el;
  });

  return (
    <>
      <Modal
        open={addOpen}
        onClose={handleAddModal}
        onClickSubmit={handleAddModal}
        title='Dodaj ucznia'
        dialogContent={<AddStudentForm {...addFormProps} />}
        maxWidth='sm'
        labelPrimary='Zakończ'
        dividers
        fullWidth
      />

      <Modal
        open={createOpen}
        onClose={handleCreateModal}
        onClickSubmit={handleCreateModal}
        title='Stwórz zadanie'
        dialogContent={<CreateTaskForm {...addCreateProps} />}
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
                onClick={() => history.push('/groups')}
              >
                <span className='back-icon'>
                  <ArrowBackIcon />
                </span>{' '}
                Grupy
              </button>
              {user !== null && user.role === 'teacher' ? (
                <button
                  className='dashboard-button task-btn'
                  onClick={handleCreateModal}
                >
                  <span className='back-icon'>
                    <AssignmentIcon />
                  </span>{' '}
                  Stwórz zadanie
                </button>
              ) : (
                ''
              )}
              <div className='bg-light'>
                <div className='container-profile'>
                  <h2 className='text-primary'>
                    {group !== null ? group.data.name : ''}
                  </h2>
                  <button
                    className='dashboard-button chat-btn'
                    onClick={() => history.push('/chatRoom')}
                  >
                    <span className='back-icon'>
                      <ChatIcon />
                    </span>{' '}
                    Chat
                  </button>
                  <div className='line'></div>
                  <h3 className='text-dark'>Właściciel</h3>
                  <p>
                    {group !== null
                      ? group.data.owner.firstName +
                        ' ' +
                        group.data.owner.lastName +
                        ' - ' +
                        group.data.owner.email
                      : ''}
                  </p>
                  {group !== null && group.data.description !== '' ? (
                    <>
                      <h3 className='text-dark'>Opis</h3>
                      <p>{group.data.description}</p>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <h2 className='text-primary'>Członkowie grupy</h2>
              {user !== null && user.role === 'teacher' ? (
                <button
                  className='dashboard-button profile-btn'
                  onClick={handleAddModal}
                >
                  <span className='back-icon'>
                    <PersonAddIcon />
                  </span>{' '}
                  Dodaj członka
                </button>
              ) : null}
              {group !== null ? (
                <MUIDataTable
                  options={TableOptions}
                  title='Członkowie grupy'
                  columns={columns}
                  data={data2}
                />
              ) : (
                <MUIDataTable
                  title='Członkowie grupy'
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
};

GroupProfile.propTypes = {
  group: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired,
  addStudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getGroupById, addStudent, deleteStudent, createTask }
)(GroupProfile);
