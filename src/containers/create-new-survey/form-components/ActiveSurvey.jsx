import React from "react"
import { useState } from "react";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import classes from "./ActiveSurvey.module.css";
import Switch from "@material-ui/core/Switch";
import Grid from '@material-ui/core/Grid';


const ActiveSurvey = (props) => {
  const [switchChecked, setSwitchChecked] = useState(false);
  return (
    <div className={classes["overlap-group"]}>
      <div className={classes["active-label"]}>Survey active?</div>
      {/* <ToggleSwitch /> */}
      {/* <Switch
        // checked={state.checkedB}
        // onChange={handleChange}
        size="normal"
        color="primary"
        name="checkedB"
        inputProps={{ "aria-label": "primary checkbox" }}
      /> */}

      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>Off</Grid>
        <Grid item>
          <Switch
            checked={switchChecked}
            onChange={() => setSwitchChecked(!switchChecked)}
            // value={switchChecked}
            name="checkedC"
            inputRef={props.inputRef}
          />
        </Grid>
        <Grid item>On</Grid>
      </Grid>
    </div>
  );
};

export default ActiveSurvey;
