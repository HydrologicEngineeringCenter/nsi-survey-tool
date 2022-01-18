import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
  } = props

  const [showControl, setShowControl] = useState({})

  const handleRedirectToSurveyTray = _ => {
    doUpdateUrl("/nsi-survey/main")
    doSurvey_loadSurveyTray()
  }

  const handleCollapse = id => {
    var localControl = {}
    survey_surveys.forEach(survey => localControl[survey.id] = false)
    localControl[id] = !showControl[id]
    setShowControl(localControl)
  }

  return (
    <TableContainer component={Paper} className={classes["active-survey-list"]}>
      <Table className={classes.table} arial-label="simple-table">

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {survey_surveys && survey_surveys.map((row) => (
            <Fragment>
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={_ => handleCollapse(row.id)}
                  >
                    {showControl[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${row.title}`}
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${row.description}`}
                </TableCell>
                {/* do a client side rerouting or redux states will reset to empty*/}
                <TableCell component="th" scope="row">
                  <a onClick={handleRedirectToSurveyTray}>{`${row.id}`}</a>
                </TableCell>
              </TableRow>

              {/* expanded prompt */}
              <TableRow>
                <Collapse in={showControl[row.id]} timeout="auto">
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
  "doSurvey_sendRequestUpdateSurvey",
  AllSurveyList
)
