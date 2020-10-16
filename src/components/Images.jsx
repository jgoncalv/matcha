import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonIcon from '@material-ui/icons/Person';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Upload from './Upload';
import sdk from '../sdk';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserAvatar } from '../store/src/user';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function RemoveImage({ id, onImageRemoved }) {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  const avatarId = useSelector(state => state.user.avatarId);
  const [removing, setRemoving] = useState(false);

  function onDeleteImageClick() {
    if (removing) return;
    setRemoving(true);
    sdk.user.removeUserImage(username, id)
      .then(() => onImageRemoved(id))
      .finally(() => setRemoving(true));
  }

  if (avatarId === id) {
    return <IconButton className={classes.icon}>
      <DeleteForeverIcon />
    </IconButton>
  }

  return <IconButton className={classes.icon} onClick={onDeleteImageClick}>
    <DeleteIcon/>
  </IconButton>;
}

function AvatarImage({ id }) {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  const avatarId = useSelector(state => state.user.avatarId);
  const dispatch = useDispatch();

  function onClick() {
    dispatch(changeUserAvatar({ username, id }));
  }

  if (avatarId === id) {
    return <IconButton className={classes.icon}>
      <PersonIcon/>
    </IconButton>;
  }

  return <IconButton className={classes.icon} onClick={onClick}>
    <PersonOutlineIcon/>
  </IconButton>;
}

export default function () {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  const [ fetchingImages, setFetchingImages ] = useState(false);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    setFetchingImages(true);
    sdk.user.getUserImages(username)
      .then(({ data }) => setImages(data.images))
      .finally(() => setFetchingImages(false));
  }, []);

  const onImageRemoved = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  const onUploaded = (image) => {
    setImages([ ...images, image ]);
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} cols={5} className={classes.gridList}>
        <GridListTile key="Subheader" cols={5} style={{ height: 'auto' }} justify-start>
          <Grid container directions="row" justify="flex-start" alignItems="center">
            <ListSubheader component="div">
              Images
            </ListSubheader>
            <Upload onUploaded={onUploaded}/>
          </Grid>
        </GridListTile>
        {
          fetchingImages ? <CircularProgress/> :
            images.map((image, index) => (
                <GridListTile key={index}>
                  <img src={image.image_path}/>
                  <GridListTileBar
                    titlePosition="bottom"
                    actionIcon={<RemoveImage id={image.id} onImageRemoved={onImageRemoved}/>}
                  />
                  <GridListTileBar
                    titlePosition="top"
                    actionIcon={<AvatarImage id={image.id}/>}
                  />
                </GridListTile>
              ),
            )
        }
      </GridList>
    </div>
  );
}
