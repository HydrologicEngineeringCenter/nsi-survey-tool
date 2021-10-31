// https://material-ui.com/components/tables/

import React from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import classes from "./SurveyorsList.module.css";
import { Checkbox } from '@material-ui/core';

const DUMMY_SURVEYORS = [
  {
    id: "s1",
    lastName: "Doe",
    firstName: "Jane",
    owner: true,
  },
  {
    id: "s2",
    lastName: "Doe",
    firstName: "John",
    owner: false,
  },
  {
    id: "s3",
    lastName: "Rodríguez",
    firstName: "Bender",
    owner: false,
  },

];

const SurveyorsList = (props) => {
  return (
    <TableContainer component={Paper} className={classes["surveyors-list"]}>
      <Table className={classes.table} arial-label="simple-table">
        <TableHead>
          <TableRow>
            <TableCell>LAST NAME</TableCell>
            <TableCell>FIRST NAME</TableCell>
            <TableCell align="right">OWNER?</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {DUMMY_SURVEYORS.map((row) => (
            <TableRow key={row.id}>

              <TableCell component="th" scope="row">
                {`${row.lastName}`}
              </TableCell>

              <TableCell component="th" scope="row">
                {`${row.firstName}`}
              </TableCell>

              <TableCell padding="checkbox" >
                <Checkbox className={classes.checkbox} id={`checkbox__${row.id}`} checked={row.owner} />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SurveyorsList;
