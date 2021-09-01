import {Fragment} from "react";
import classes from "./ActionButtons.module.css";


const ActionButtons = props => {
  return (
    <div className={classes["flex-box-horizontal"]}>
      <div className={`${classes["cancel-button"]} ${classes.button}`}>
        <div className={`${classes["valign-text-middle"]} ${classes.text}`}>Cancel</div>
      </div>

    <div className={`${classes["submit-button"]} ${classes.button}`}>
    <div className={`${classes["valign-text-middle"]} ${classes.text}`}>Create</div>
    
    </div>
  </div>
  );
};

export default ActionButtons;