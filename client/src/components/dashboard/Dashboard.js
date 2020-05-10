import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import Menu from '../shared/Menu';
import { addGroup } from '../../actions/group';
import { TableOptions } from '../../shared/consts/TableOption.constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Dashboard = ({ auth: { user = {}, isAuthenticated } }) => {
  const classes = useStyles();

  const tableButton = (
    <button className='dashboard-button'>
      {' '}
      {isAuthenticated && user !== null && user.role === 'student'
        ? 'Pokaż'
        : 'Sprawdź'}{' '}
    </button>
  );

  const columns = ['Autor', 'Zadanie', 'Termin', ''];
  const data = [
    ['Patryk Bochnak', 'Task1', '04.05.2020', tableButton],
    ['Kamil Drozd', 'Task1', '02.05.2020', tableButton]
  ];

  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Menu />
        <Grid container spacing={5}>
          <Grid item xs>
            <h1 className='large text-primary'>
              {' '}
              {isAuthenticated && user !== null && user.role === 'student'
                ? 'Zadania do sprawdzenia'
                : 'Zadania do zrobienia'}{' '}
            </h1>
            <MUIDataTable
              title={
                isAuthenticated && user !== null && user.role === 'student'
                  ? 'Zadania do sprawdzenia'
                  : 'Zadania do zrobienia'
              }
              data={data}
              columns={columns}
              options={TableOptions}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  addGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addGroup }
)(Dashboard);
