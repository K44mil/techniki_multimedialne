import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getGroupById } from '../../actions/group';
import MUIDataTable from 'mui-datatables';
import { CircularProgress } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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

const columns = ['Imię', 'Nazwisko'];
const GroupProfile = ({ group: { group, loading } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(
    group => {
      if (group !== null && group !== undefined) {
        dispatch(getGroupById(group.data.id));
      }
    },
    [dispatch]
  );

  if (loading || (loading && group === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  } else if (!loading && group === null) {
    return <Redirect to='/groups' />;
  }

  return (
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
            <div className='bg-light'>
              <div className='container-profile'>
                <h2 className='text-primary'>
                  {group !== null ? group.data.name : ''}
                </h2>
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
            <button
              className='dashboard-button profile-btn'
              onClick={() => history.push('/groups')}
            >
              <span className='back-icon'>
                <PersonAddIcon />
              </span>{' '}
              Dodaj członka
            </button>
            {group !== null ? (
              <MUIDataTable
                options={TableOptions}
                title='Członkowie grupy'
                columns={columns}
                data={group.data.members}
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
  );
};

GroupProfile.propTypes = {
  group: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  group: state.group
});
export default connect(
  mapStateToProps,
  { getGroupById }
)(GroupProfile);
