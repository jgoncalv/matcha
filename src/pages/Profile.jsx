import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import sdk from '../sdk';
import CircularProgress from '@material-ui/core/CircularProgress';

import data from '../data.json'

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

const genders = [
  {
    value: 'male',
  },
  {
    value: 'female',
  },
  {
    value: 'other',
  },
  {
    value: undefined,
  }
];

const sexualOrientations = [
  {
    value: 'hetero',
  },
  {
    value: 'homo',
  },
  {
    value: 'other',
  },
  {
    value: undefined,
  }
];

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const [ firstName, setFirstName ] = useState(data.firstName);
  const [ name, setName ] = useState(data.name);
  const [ email, setEmail ] = useState(data.email);
  const [ username, setUsername ] = useState(data.userName);
  const [ gender, setGender ] = useState(data.gender);
  const [ sexualOrientation, setSexualOrientation ] = useState(data.sexualOrientation);
  const [ bio, setBio ] = useState(data.bio);
  const [ interests, setInterests ] = useState(data.interests);
  const [ password, setPassword ] = useState('************');
  const [ confirmPassword, setConfirmPassword ] = useState('************');
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <AccountBoxIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      Profil
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
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
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
          value={name}
          onChange={(e) => {
            setName(e.target.value)
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
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          select
          variant="outlined"
          margin="normal"
          fullWidth
          id="gender"
          label="Gender"
          name="gender"
          autoComplete="gender"
          autoFocus
          value={gender}
          onChange={(e) => {
            setGender(e.target.value)
          }}
        >
          {genders.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
      <TextField
          select
          variant="outlined"
          margin="normal"
          fullWidth
          id="sexualOrientation"
          label="Sexual Orientation"
          name="sexualOrientation"
          autoComplete="sexual-orientation"
          autoFocus
          value={sexualOrientation}
          onChange={(e) => {
            setSexualOrientation(e.target.value)
          }}
        >
          {sexualOrientations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={3}
          rowsMax={3}
          variant="outlined"
          margin="normal"
          fullWidth
          id="bio"
          label="Bio"
          name="bio"
          autoComplete="bio"
          autoFocus
          value={bio}
          onChange={(e) => {
            setBio(e.target.value)
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={2}
          variant="outlined"
          margin="normal"
          fullWidth
          id="interests"
          label="Interets"
          name="interests"
          autoComplete="interests"
          autoFocus
          value={interests}
          onChange={(e) => {
            setInterests(e.target.value)
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
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
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
        />
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={loading}
        onClick={async () => {
          setErrorMsg('');
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
            await sdk.user.update({
              email,
              username,
              password,
              first_name: firstName,
              name,
              gender,
              sexualOrientation,
              bio,
              interests
            });
            history.push('/dashboard/profil');
            setLoading(false);
          } catch (e) {
            setErrorMsg('We failed to update your information')
            setLoading(false);
          }
        }}
      >
        {
          loading ?
          <CircularProgress color="secondary"/> :
          'Update'
        }
      </Button>
      <Grid item xs={12}>
        {errorMsg}
      </Grid>
    </Grid>
  </div>;
};
