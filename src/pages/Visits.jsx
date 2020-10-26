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

export default function Visits() {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);

  const [ loading, setLoading ] = useState(true);
  const [ visits, setVisits ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState([]);

  var number = 1
  useEffect(() => {
    setLoading(true);
    sdk.user.getVisits({username, number})
      .then(({data}) => {
        if (data.visits) {
          setVisits(data.visits);
          setPageNumber(data.number_of_pages);
        } else {
          setVisits([]);
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
      <Title>Ils vous ont consultés</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Liké le</TableCell>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.visited_at}</TableCell>
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
