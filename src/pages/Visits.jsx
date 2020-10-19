import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Title } from './Home'
import { useSelector } from 'react-redux';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Visits() {
  const classes = useStyles();
  const visits = useSelector(state => state.user.visits);
  return (
    <React.Fragment>
      <Title>Ils vous ont consultés</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Visité le</TableCell>
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
        <Link color="primary" href="#" onClick={preventDefault}>
          See more visits
        </Link>
      </div>
    </React.Fragment>
  );
}
