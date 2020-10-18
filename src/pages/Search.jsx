import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { red } from '@material-ui/core/colors';
import Pagination from '@material-ui/lab/Pagination';

import sdk from '../sdk';
import { Grid } from '@material-ui/core';

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
  input: {
    display: 'none',
  },
  photoProfile: {
    width: '200px',
    height: '200px',
    border: '1px solid black',
    borderRadius: '100%',
  },
  media: {
    height: 140,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    maxWidth: 345,
  }
}));

export default () => {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  const [ loading, setLoading ] = useState(true);
  const [ suggestions, setSuggestions ] = useState([]);

  useEffect(() => {
    setLoading(true);
    sdk.user.searchUsers({username})
      .then(({data}) => {
        console.log(data.users);
        if (data.users) {
          setSuggestions(data.users);
        } else {
          setSuggestions([]);
        }
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return <CircularProgress color="secondary" />
  }

  return <div className={classes.paper}>
    <Typography component="h1" variant="h5">
      Recherche
    </Typography>
    <GridList cellHeight={600}>
      {
        suggestions.length
          ? suggestions.map((suggestion) => {
            return (
              <GridListTile>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={suggestion.avatar_path ?? '/profile-default.png'}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {`${suggestion.first_name} ${suggestion.name}`}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {suggestion.biography}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="secondary">
                      Like
                    </Button>
                  </CardActions>
                </Card>
              </GridListTile>
            )
          })
          : undefined
      }
    </GridList>
    <Grid item xs={12}>
      <Pagination count={10} color="primary" />
    </Grid>
  </div>;
};
