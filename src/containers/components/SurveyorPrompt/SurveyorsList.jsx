// https://material-ui.com/components/tables/
import React, { Fragment, useState } from "react"
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
import RemoveSelfConfirmDialog from '../RemoveSelfConfirmDialog/RemoveSelfConfirmDialog'
import classes from "./SurveyorsList.module.css";

const SurveyorsList = (props) => {
  // each element in usersList is an obj with 2 properties: userId and userName
  const {
    userSurveyMembers: surveyMembers,
    survey_selectedSurvey,
    doUser_sendRequestRemoveUser,
    doUser_flipOwner,
    user_userIsAdminOrOwnerOfSelectedSurvey: showDelete, // show delete button next to surveyor
    auth_userId,
  } = props

  const [showConfirm, setShowConfirm] = useState(false)

  const handleChangeOwner = user => {

    // filter out removing ownership from last user
    // removing the flip logic here keeps the isOwner switch available for view rather than completely removing it which could be a source of confusion
    const noOwners = (surveyMembers ? (surveyMembers.filter(m => m.isOwner)).length : 0)
    if (noOwners == 1 && user.isOwner) {
      return
    }

    // turning over control to confirm prompt if removing ownership from self
    if (user.isOwner && auth_userId == user.userId) {
      setShowConfirm(true)
      return
    }

    doUser_flipOwner(user)
  }

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
                  onChange={_ => handleChangeOwner(row)}
                  name={`switch-${row.userId}`}
                />
              </TableCell>

              {
                showDelete && !row.isOwner &&
                <Fragment>
                  <TableCell align="right" component="th" scope="row">
                    <Button variant="outlined" color="secondary" onClick={_ => doUser_sendRequestRemoveUser(survey_selectedSurvey.id, row.userId)}>X</Button>
                  </TableCell>
                </Fragment>
              }

              {
                showDelete && row.isOwner &&
                <TableCell align="right" component="th" scope="row">
                </TableCell>
              }

              {
                showConfirm &&
                <RemoveSelfConfirmDialog user={row} onClose={_ => setShowConfirm(false)} />
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
  'selectAuth_userId',
  SurveyorsList
)
