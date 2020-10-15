import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Title } from './Home'

// Generate Order Data
function createData(id, date, name) {
  return { id, date, name };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley'),
  createData(1, '16 Mar, 2019', 'Paul McCartney'),
  createData(2, '16 Mar, 2019', 'Tom Scholz'),
  createData(3, '16 Mar, 2019', 'Michael Jackson'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Ils vous ont consultés</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
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
