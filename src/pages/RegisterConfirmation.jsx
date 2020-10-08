import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
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

  return <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Your account as successfully been created. Please check your emails to confirm.
      </Grid>
    </Grid>
  </div>;
};
