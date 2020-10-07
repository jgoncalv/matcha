import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import sdk from '../sdk';

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
  const history = useHistory();
  const [ firstName, setFirstName ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="first-name"
          autoFocus
          onChange={(e) => {
            const { value } = e.target;
            setFirstName(value ?? '');
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="last-name"
          autoFocus
          onChange={(e) => {
            const { value } = e.target;
            setName(value ?? '');
          }}
        />
      </Grid>
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
          onChange={(e) => {
            const { value } = e.target;
            setEmail(value ?? '');
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => {
            const { value } = e.target;
            setUsername(value ?? '');
          }}
        />
      </Grid>
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
          onChange={(e) => {
            const { value } = e.target;
            setPassword(value ?? '');
          }}
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
          onChange={(e) => {
            const { value } = e.target;
            setConfirmPassword(value ?? '');
          }}
        />
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={async () => {
          if (!firstName || !name || !email || !username || !password || !confirmPassword) {
            setErrorMsg('Fill all the inputs');
            return ;
          }

          if (password !== confirmPassword) {
            setErrorMsg('The two passwords are not the same');
            return;
          }

          setLoading(true);
          try {
            await sdk.auth.register({
              email,
              username,
              password,
              first_name: firstName,
              name,
            });
            history.push('/register/confirm')
            setLoading(false);
          } catch (e) {
            setErrorMsg('We failed to register you')
            setLoading(false);
          }
        }}
      >
        Sign Up
      </Button>
      <Grid item xs={12}>
        {errorMsg}
      </Grid>
      <Grid container>
        <Grid item xs>
          {/*<Link href="#" variant="body2">*/}
          {/*  Forgot password?*/}
          {/*</Link>*/}
        </Grid>
        <Grid item>
          <Link to="/login">
            {'Already have an account? Sign in'}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </div>;
};
