// https://material-ui.com/components/tables/
import React from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Switch from "@material-ui/core/Switch";
import { connect } from 'redux-bundler-react';
import classes from "./SurveyorsList.module.css";

const SurveyorsList = (props) => {
  // each element in usersList is an obj with 2 properties: userId and userName
  const {
    userSurveyMembers: surveyMembers,
    survey_selectedSurvey,
    doUser_sendRequestRemoveUser,
    doUser_flipOwner,
    user_userIsAdminOrOwnerOfSelectedSurvey: showDelete, // show delete button next to surveyor
  } = props

  return (
    <TableContainer component={Paper} className={classes["surveyors-list"]}>
      <Table className={classes.table} arial-label="simple-table">
        <TableHead>
          <TableRow>
            <TableCell>USER</TableCell>
            <TableCell align="right">OWNER?</TableCell>
            {showDelete &&
              <TableCell align="right">REMOVE</TableCell>
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {surveyMembers && [...surveyMembers].reverse().map((row) => (
            <TableRow key={row.userId}>

              <TableCell component="th" scope="row">
                {`${row.userName}`}
              </TableCell>

              <TableCell padding="checkbox" >
                <Switch
                  checked={row.isOwner}
                  onChange={_ => doUser_flipOwner(row)}
                  name={`switch-${row.userId}`}
                />
              </TableCell>

              {showDelete && !row.isOwner &&
                <TableCell align="right" component="th" scope="row">
                  <Button variant="outlined" color="secondary" onClick={_ => doUser_sendRequestRemoveUser(survey_selectedSurvey.id, row.userId)}>X</Button>
                </TableCell>
              }

              {showDelete && row.isOwner &&
                <TableCell align="right" component="th" scope="row">
                </TableCell>
              }

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
};

export default connect(
  'selectUserSurveyMembers',
  'selectSurvey_selectedSurvey',
  'doUser_sendRequestRemoveUser',
  'doUser_flipOwner',
  'selectUser_userIsAdminOrOwnerOfSelectedSurvey',
  SurveyorsList
)
