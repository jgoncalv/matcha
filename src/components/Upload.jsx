import React, { useState } from 'react';
import sdk from '../sdk';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
}));

export default ({ onUploaded }) => {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e) {
    setError('');
    setUploading(true)
    sdk.user.uploadImage(username, e.target.files[ 0 ])
      .then(({data}) => {
        onUploaded(data.image)
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to upload')
      })
      .finally(() => setUploading(false));
  }

  return <div>
    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleFileChange}/>
    <label htmlFor="icon-button-file">
      <IconButton color="primary" aria-label="upload picture" component="span">
        {uploading ? <CircularProgress /> : <PhotoCamera/>}
      </IconButton>
      {error}
    </label>
  </div>;
}
