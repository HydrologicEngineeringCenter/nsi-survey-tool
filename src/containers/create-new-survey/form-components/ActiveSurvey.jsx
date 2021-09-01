import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import classes from "./ActiveSurvey.module.css";

const ActiveSurvey = props => {
  return (
    <div className={classes["overlap-group"]}>
      <div className={classes["active-label"]}>Active Survey</div>
      <ToggleSwitch />
    </div>
  )
};

export default ActiveSurvey;