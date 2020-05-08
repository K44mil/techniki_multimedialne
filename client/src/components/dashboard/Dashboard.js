import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import GroupIcon from '@material-ui/icons/Group';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import MUIDataTable from 'mui-datatables';
import { Modal } from '../shared/Modal';
import Group from './Group';
import { addGroup } from '../../actions/group';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  item: { backgroundColor: blue }
}));

const tableButtonStudent = <button className='dashboard-button'>Pokaż</button>;

const tableButtonTeacher = (
  <button className='dashboard-button'>Sprawdź</button>
);

const columns = ['Autor', 'Zadanie', 'Termin', ''];
const data = [
  ['Patryk Bochnak', 'Task1', '04.05.2020', tableButtonStudent],
  ['Kamil Drozd', 'Task1', '02.05.2020', tableButtonStudent]
];

const titleStudent = 'Zadania do zrobienia';
const titleTeacher = 'Zadania do sprawdzenia';

const options = {
  sortFilterList: false,
  filter: false,
  print: false,
  download: false,
  selectableRows: 'none',
  viewColumns: false,
  searchPlaceholder: 'Your Custom Search Placeholder'
};

const Dashboard = ({ auth: { user, isAuthenticated }, addGroup }) => {
  const classes = useStyles();
  const addForm = useRef(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  //   const [id, setID] = useState();

  const [addOpen, setAddOpen] = useState(false);

  const handleDeleteModal = () => {
    setDeleteOpen(!deleteOpen);
  };

  const handleAddModal = () => {
    setAddOpen(!addOpen);
  };

  const studentButton = (
    <Grid item xs={12} sm={12}>
      <button className='dashboard-button' type='submit'>
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
        <button className='dashboard-button' type='submit'>
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
    handleSubmit: (name, description) => addGroup(name, description)
  };

  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Modal
          open={addOpen}
          onClose={handleAddModal}
          onClickSubmit={handleAddModal}
          title='Utwórz grupę'
          dialogContent={<Group {...addFormProps} />}
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
                  <p className='p-dashboard'>15</p>
                </Grid>
                {isAuthenticated && user.role === 'student'
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
                  <p class='p-dashboard'>5</p>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <button className='dashboard-button' type='submit'>
                    Sprawdź powiadomienia
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
                  <p class='p-dashboard'>10</p>
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
        <Grid container spacing={5}>
          <Grid item xs>
            <h1 className='large text-primary'> {titleStudent} </h1>
            <MUIDataTable
              title={titleStudent}
              data={data}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addGroup }
)(Dashboard);
