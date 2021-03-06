import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import AlreadyConnected from '../components/AlreadyConnected';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default ({ children }) => {
  const classes = useStyles();
  const isConnected = useSelector(state => state.user.isConnected);

  return <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    <div>
      {isConnected ? <AlreadyConnected /> : children}
    </div>
    </Grid>
  </Grid>
};
