import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import Menu from '../shared/Menu';
import PropTypes from 'prop-types';
import { getGroups } from '../../actions/group';
import {
  tableID,
  TableOptions
} from '../../shared/consts/TableOption.constants';
import { getGroupById, deleteGroup } from '../../actions/group';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Groups = ({
  group: { groups, loading },
  auth: { user },
  getGroupById,
  deleteGroup
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
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
    '',
    ''
  ];

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  if (loading || (loading && groups === null)) {
    return (
      <div className='loader'>
        <CircularProgress />
      </div>
    );
  }

  if (groups.data) {
    const tableButton = (
      <button
        className='dashboard-button'
        onClick={() => {
          setTimeout(() => {
            getGroupById(tableID.ID);
            history.push('/groupProfile');
          }, 100);
        }}
      >
        Pokaż
      </button>
    );

    const deleteGroupButton = (
      <button
        className='dashboard-button'
        onClick={() => {
          setTimeout(() => {
            deleteGroup(tableID.ID);
          }, 100);
        }}
      >
        Usuń
      </button>
    );

    const myGroups = groups.data.map(el => {
      return Object.keys(el).map(key => {
        if (key === 'name' || key === 'description' || key === '_id') {
          return el[key];
        }
      });
    });

    const data = myGroups.map(el => {
      return el.filter(value => value !== undefined);
    });

    const data2 = data.map(el => {
      if (user !== null && user.role === 'student') {
        el.push(tableButton);
      } else {
        el.push(tableButton, deleteGroupButton);
      }

      return el;
    });

    return (
      <section className='container container-dashboard'>
        <div className={classes.root}>
          <Menu />
          <Grid container spacing={5}>
            <Grid item xs>
              <h1 className='large text-primary'>Twoje grupy</h1>
              <MUIDataTable
                title='Twoje grupy'
                data={data2}
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
              <h1 className='large text-primary'>Twoje grupy</h1>
              <MUIDataTable
                title='Twoje grupy'
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

Groups.propTypes = {
  group: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired,
  deleteGroup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  group: state.group
});

export default connect(
  mapStateToProps,
  { getGroupById, deleteGroup }
)(Groups);
