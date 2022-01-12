import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from "@material-ui/core/Switch";
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import { useState, Fragment } from "react"
import ControlPrompt from "./ControlPrompt"

import { connect } from 'redux-bundler-react';
import classes from "./AllSurveyList.module.css";

const AllSurveyList = (props) => {
  // each element in usersList is an obj with 2 properties: userId and userName
  const {
    survey_surveys,
    doUpdateUrl,
    doSurvey_loadSurveyTray,
    doSurvey_showManageSurvey,
    manageSurvey_showControlPrompt,
    doManageSurvey_flipControlPromptDisplay,
  } = props

  const handleRedirectToSurveyTray = _ => {
    doUpdateUrl("/nsi-survey/main")
    doSurvey_loadSurveyTray()
  }
  const handleChangeActive = _ => {
  }

  return (
    <TableContainer component={Paper} className={classes["active-survey-list"]}>
      <Table className={classes.table} arial-label="simple-table">

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Active?</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {survey_surveys && survey_surveys.map((row, idx) => (
            <Fragment>
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={_ => doManageSurvey_flipControlPromptDisplay(row.id)}
                  >
                    {manageSurvey_showControlPrompt[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${row.title}`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${row.description}`}
                </TableCell>
                <TableCell padding="checkbox" >
                  <Switch
                    checked={row.active}
                    onChange={handleChangeActive}
                    name="checkedC"
                    inputRef={props.inputRef}
                  />
                </TableCell>
                {/* do a client side rerouting or redux states will reset to empty*/}
                <TableCell component="th" scope="row">
                  <a onClick={handleRedirectToSurveyTray}>{`${row.id}`}</a>
                </TableCell>
              </TableRow>

              {/* expanded prompt */}
              <TableRow>
                <Collapse in={manageSurvey_showControlPrompt[row.id]} >
                  <ControlPrompt />
                </Collapse>
              </TableRow>

            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default connect(
  "selectSurvey_surveys",
  "doUpdateUrl",
  "doSurvey_loadSurveyTray",
  "doSurvey_showManageSurvey",
  "selectManageSurvey_showControlPrompt",
  "doManageSurvey_flipControlPromptDisplay",
  AllSurveyList
)
