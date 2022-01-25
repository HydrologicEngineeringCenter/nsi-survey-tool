import React from "react"
import { useState } from "react";
import classes from "./ActiveSurveySwitch.module.css";
import Switch from "@material-ui/core/Switch";
import Grid from '@material-ui/core/Grid';
import { connect } from "redux-bundler-react"

const ActiveSurvey = (props) => {

  const {
    doManageSurvey_flipActive,
    survey_selectedSurvey: survey,
    initActive
  } = props

  const [switchChecked, setSwitchChecked] = useState(initActive);

  const handleSwitchActive = survey => {
    setSwitchChecked(!switchChecked)
    doManageSurvey_flipActive(survey)
  }

  return (
    <div className={classes["overlap-group"]}>
      <div className={classes["active-label"]}>Active</div>

      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Off</Grid>
        <Grid item>
          <Switch
            checked={switchChecked}
            onChange={_ => handleSwitchActive(survey)}
            name="checkedC"
            inputRef={props.inputRef}
          />
        </Grid>
        <Grid item>On</Grid>
      </Grid>
    </div>
  );
};

export default connect(
  "doManageSurvey_flipActive",
  "selectSurvey_selectedSurvey",
  ActiveSurvey,
)
