import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CircularProgress from '@material-ui/core/CircularProgress';

import Images from '../components/Images'
import sdk from '../sdk';
import Interests from '../components/Interests';

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
  input: {
    display: 'none',
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
];

const sexualOrientations = [
  {
    value: 'hetero',
  },
  {
    value: 'gay',
  },
  {
    value: 'bisexuel',
  },
];

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const username = useSelector(state => state.user.username);
  const _firstName = useSelector(state => state.user.firstName);
  const _name = useSelector(state => state.user.name);
  const _gender = useSelector(state => state.user.gender);
  const _sexualOrientation = useSelector(state => state.user.sexualOrientation);
  const _biography = useSelector(state => state.user.sexualOrientation);
  const _interests = useSelector(state => state.user.interests);
  const [ firstName, setFirstName ] = useState(_firstName);
  const [ name, setName ] = useState(_name);
  const [ gender, setGender ] = useState(_gender);
  const [ sexualOrientation, setSexualOrientation ] = useState(_sexualOrientation);
  const [ bio, setBio ] = useState(_biography);
  const [ interests, setInterests ] = useState(_interests);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ loading, setLoading ] = useState(false);

  return <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <AccountBoxIcon/>
    </Avatar>
    <Typography component="h1" variant="h5">
      Profile
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
        <Interests interests={interests} />
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
          if (!firstName || !name) {
            setErrorMsg('Fill all the inputs');
            return ;
          }

          setLoading(true);
          try {
            await sdk.user.update(username, {
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
      <Images username={username} isUpdatable />
      <Grid item xs={12}>
        {errorMsg}
      </Grid>
    </Grid>
  </div>;
};
