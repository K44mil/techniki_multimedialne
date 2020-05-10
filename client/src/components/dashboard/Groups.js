import React from 'react';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { TableOptions } from '../../shared/consts/TableOption.constants';
import Menu from '../shared/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Groups = () => {
  const classes = useStyles();

  return (
    <section className='container container-dashboard'>
      <div className={classes.root}>
        <Menu />
        <Grid container spacing={5}>
          <Grid item xs>
            <h1 className='large text-primary'>Twoje grupy</h1>
            <MUIDataTable
              title='Twoje grupy'
              //   data={data}
              //   columns={columns}
              options={TableOptions}
            />
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Groups;
