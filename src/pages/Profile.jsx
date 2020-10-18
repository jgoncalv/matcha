import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Images from '../components/Images';
import sdk from '../sdk';
import Interests from '../components/Interests';
import { useSelector } from 'react-redux';

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
  photoProfile: {
    width: '200px',
    height: '200px',
    border: '1px solid black',
    borderRadius: '100%',
  }
}));

export default () => {
  const classes = useStyles();
  const { username } = useParams();
  const _username = useSelector(state => state.user.username);
  const [ profile, setProfile ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const isSameUser = username === _username;

  useEffect(() => {
    setLoading(true);
    sdk.user.getProfil({ username })
      .then(({ data }) => setProfile(data))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return <CircularProgress color="secondary" />
  }

  if (!profile) {
    return <Redirect to="/404" />
  }

  return <div className={classes.paper}>
    <Typography component="h1" variant="h5">
      Profile
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <img className={classes.photoProfile} src={profile.avatar_path ?? '/profile-default.png'} alt="profile-avatar"/>
      </Grid>
      {
        isSameUser
          ? (
            <Grid item xs={12}>
              <Link to={`/profile/${username}/update`} style={{textDecoration: 'none'}}>
                <Button variant="contained" color="secondary">
                  Modifier
                </Button>
              </Link>
            </Grid>
          )
          : (
            <Grid item xs={12}>
              <Button variant="contained" color="secondary">
                Like
              </Button>
            </Grid>
          )
      }
      <Grid item xs={12}>
        <Typography>Name: {`${profile.first_name} ${profile.name}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Gender: {profile.gender ?? '?'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Score: {profile.score ?? '?'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Sexual orientation: {profile.sexual_orientation ?? '?'}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>Interests:</Typography>
        <Interests interests={profile.interests} />
      </Grid>
      <Grid item xs={12}>
        <Images username={username} />
      </Grid>
    </Grid>
  </div>;
};
