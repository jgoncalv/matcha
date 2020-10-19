import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import Visits from './Visits';

export function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default () => {
  const classes = useStyles();

  return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Bienvenue, Prénom</Title>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Visits/>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Title>Ils vous ont likés</Title>
        </Paper>
      </Grid>
  </Grid>
};
