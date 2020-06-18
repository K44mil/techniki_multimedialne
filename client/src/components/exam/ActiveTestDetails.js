import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getGroups } from '../../actions/group';
import { getTestById, activateTest } from '../../actions/test';
import MUIDataTable from 'mui-datatables';
import { CircularProgress } from '@material-ui/core';
import { Modal } from '../shared/Modal';
import ActivateTestForm from './ActivateTestForm';
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
const ActiveTestDetails = ({
  test: { details, loading },
  group: { groups },
  auth: { user },
  getTestById,
  getGroups
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const createForm = useRef(null);

  const columns = [
    {
      name: 'id',
      options: {
        display: 'false'
      }
    },
    {
      name: 'Nazwa grupy'
    },
    'Opis',
    ''
  ];
  //   if (details && details !== undefined) {
  //     localStorage.setItem('testId', test._id);
  //   }
  //   const [createOpen, setCreateOpen] = useState(false);
  //   const handleCreateModal = () => {
  //     setCreateOpen(!createOpen);
  //   };
  //   const handleCreate = (values, actions) => {
  //     const data = {
  //       availableAt: values.availableAt,
  //       availableUntil: values.availableUntil,
  //       groupId: tableID.ID,
  //       testId: test._id
  //     };
  //     dispatch(activateTest(data));
  //     actions.resetForm({});
  //     setCreateOpen(!createOpen);
  //   };

  //   const addCreateProps = {
  //     initialState: {
  //       availableAt: '',
  //       availableUntil: ''
  //     },
  //     setRef: createForm,
  //     handleSubmit: (values, actions) => {
  //       handleCreate(values, actions);
  //     }
  //   };
  //   useEffect(() => {
  //     dispatch(() => getGroups());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (loading) {
  //       getTestById(localStorage.getItem('testId'));
  //     }
  //   }, [loading]);

  //   const tableButton = (
  //     <button className='dashboard-button task-btn' onClick={handleCreateModal}>
  //       Aktywuj test
  //     </button>
  //   );
  if (loading) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }
  if (details !== undefined && details !== null) {
    //     const myGroups = groups.data.map(el => {
    //       return Object.keys(el).map(key => {
    //         if (key === 'name' || key === 'description' || key === '_id') {
    //           return el[key];
    //         }
    //       });
    //     });

    //     const data = myGroups.map(el => {
    //       return el.filter(value => value !== undefined);
    //     });
    //     const data2 = data.map(el => {
    //       if (user !== null && user.role === 'teacher') {
    //         el.push(tableButton);
    //       }
    //       return el;
    //     });
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
                  Test
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'>
                      {details !== null ? details.name : ''}
                    </h2>
                    {details !== null && details.description !== '' ? (
                      <>
                        <h3 className='text-dark'>Opis</h3>
                        <p>{details.description}</p>
                      </>
                    ) : (
                      ''
                    )}
                    {details !== null && details.createdAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data stworzenia</h3>
                        <p>{new Date(details.createdAt).toLocaleString()}</p>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                {/* <h2 className='text-primary'>Twoje grupy</h2>
                {groups !== null ? (
                  <MUIDataTable
                    options={TableOptions}
                    title='Twoje grupy'
                    columns={columns}
                    data={data2}
                  />
                ) : (
                  <MUIDataTable
                    title='Twoje grupy'
                    columns={columns}
                    options={TableOptions}
                  />
                )} */}
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
                  onClick={() => history.push('/tests')}
                >
                  <span className='back-icon'>
                    <ArrowBackIcon />
                  </span>{' '}
                  Test
                </button>
                <div className='bg-light'>
                  <div className='container-profile'>
                    <h2 className='text-primary'>
                      {test !== null ? test.name : ''}
                    </h2>
                    {test !== null && test.description !== '' ? (
                      <>
                        <h3 className='text-dark'>Opis</h3>
                        <p>{test.description}</p>
                      </>
                    ) : (
                      ''
                    )}
                    {test !== null && test.createdAt !== '' ? (
                      <>
                        <h3 className='text-dark'>Data stworzenia</h3>
                        <p>${new Date(test.createdAt).toLocaleString()}</p>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <h2 className='text-primary'>Twoje grupy</h2>
                <MUIDataTable
                  title='Twoje grupy'
                  columns={columns}
                  options={TableOptions}
                />
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
  getTestById: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  activateTest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  test: state.test
});
export default connect(
  mapStateToProps,
  { getGroups, getTestById, activateTest }
)(ActiveTestDetails);
