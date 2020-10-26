import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';


import { Title } from './Home'
import sdk from '../sdk';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Likes() {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);

  const [ loading, setLoading ] = useState(true);
  const [ likes, setLikes ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState([]);

  var number = 1
  useEffect(() => {
    setLoading(true);
    sdk.user.getLikes({username, number})
      .then(({data}) => {
        if (data.likes) {
          setLikes(data.likes);
          setPageNumber(data.number_of_pages);
        } else {
          setLikes([]);
          setPageNumber(1);
        }
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return <CircularProgress color="secondary" />
  }

  return (
    <React.Fragment>
      <Title>Ils vous ont likés</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Liké le</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {likes.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.created_at}</TableCell>
              <TableCell>{row.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Pagination count={pageNumber} color="primary" onChange={(e) => {console.log(e.target)}}/>
      </div>
    </React.Fragment>
  );
}
