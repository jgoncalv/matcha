import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import sdk from '../sdk';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  return <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Grid container spacing={2}>
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={async () => {
          console.log({ username, password });
          setErrorMsg('');
          if (!username || !password) {
            setErrorMsg('Please fill the inputs');
            return;
          }

          setLoading(true);
          try {
            await sdk.auth.login({ username, password });
            history.push('/');
            setLoading(false);
          } catch (e) {
            setErrorMsg('The username and the password is/are incorrect or doesn\'t match.');
            setLoading(false);
          }
        }}
      >
        {
          loading ?
            <CircularProgress color="secondary"/> :
            'Sign In'
        }
      </Button>
      <div>
        {errorMsg}
      </div>
      <Grid container>
        <Grid item xs>
          {/*<Link href="#" variant="body2">*/}
          {/*  Forgot password?*/}
          {/*</Link>*/}
        </Grid>
        <Grid item>
          <Link to="/register">
            {'Don\'t have an account? Sign Up'}
          </Link>
        </Grid>
      </Grid>
    </Grid>
  </div>;
};
