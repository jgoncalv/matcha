import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import sdk from '../sdk';
import CircularProgress from '@material-ui/core/CircularProgress';

import data from '../data.json';

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
  const [ email, setEmail ] = useState(data.email);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ showChangePassword, setShowChangePassword ] = useState(false);

  return <div className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          disabled
        />
      </Grid>
      {showChangePassword ? <>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-current-password"
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          {
            loading ?
              <CircularProgress color="secondary"/> :
              'Update'
          }
        </Button>
      </> : <Grid item xs={12}>
        <Button fullWidth variant="contained" color="primary" onClick={() => setShowChangePassword(true)}>Change Password</Button>
      </Grid>
      }
      <Grid item xs={12}>
        {errorMsg}
      </Grid>
    </Grid>
  </div>;
};
