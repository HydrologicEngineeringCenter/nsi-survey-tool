// https://material-ui.com/components/tables/
import React, { useEffect } from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'redux-bundler-react';

import classes from "./SurveyorsList.module.css";
import { Checkbox } from '@material-ui/core';

const SurveyorsList = (props) => {
  // each element in usersList is an obj with 2 properties: userId and userName
  const {
    doSendRequestGetSurveyMembers,
    userSurveyMembers: surveyMembers,
    createSurveyId: surveyId
  } = props

  // load existing members on init
  useEffect(_ => {
    doSendRequestGetSurveyMembers(surveyId)
  }, [])

  return (
    <TableContainer component={Paper} className={classes["surveyors-list"]}>
      <Table className={classes.table} arial-label="simple-table">
        <TableHead>
          <TableRow>
            <TableCell>USER</TableCell>
            <TableCell align="right">OWNER?</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {surveyMembers && surveyMembers.map((row) => (
            <TableRow key={row.userId}>

              <TableCell component="th" scope="row">
                {`${row.userName}`}
              </TableCell>

              <TableCell padding="checkbox" >
                <Checkbox className={classes.checkbox} id={`checkbox__${row.id}`} checked={row.isOwner} />
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default connect(
  'doSendRequestGetSurveyMembers',
  'selectUserSurveyMembers',
  'selectCreateSurveyId',
  SurveyorsList
)
