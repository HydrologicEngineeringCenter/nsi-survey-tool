import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';

import { connect } from 'redux-bundler-react';
import classes from "./ActiveSurveys.module.css";

const ActiveSurveyList = (props) => {
  // each element in usersList is an obj with 2 properties: userId and userName
  const {
    survey_surveys,
    doUpdateUrl,
    doSurvey_loadSurveyTray,
  } = props

  const handleRedirectToSurveyTray = rowId => {
    console.log(rowId)
    doUpdateUrl("/nsi-survey/main")
    doSurvey_loadSurveyTray()
  }

  return (
    <TableContainer component={Paper} className={classes["active-survey-list"]}>
      <Table className={classes.table} arial-label="simple-table">

        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Active?</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {survey_surveys && survey_surveys.filter(s => s.active).map((row) => (
            <TableRow key={row.id}>

              <TableCell component="th" scope="row">
                {`${row.title}`}
              </TableCell>

              <TableCell component="th" scope="row">
                {`${row.description}`}
              </TableCell>

              <TableCell padding="checkbox" >
                <Checkbox className={classes.checkbox} id={`checkbox__${row.id}`} checked={row.active} />
              </TableCell>

              {/* do a client side rerouting or redux states will reset to empty*/}
              <TableCell component="th" scope="row">
                <a onClick={_ => handleRedirectToSurveyTray(row.id)}>{`${row.id}`}</a>
              </TableCell>

            </TableRow>
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
  ActiveSurveyList
)
