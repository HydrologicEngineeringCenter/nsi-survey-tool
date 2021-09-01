// https://www.sitepoint.com/react-toggle-switch-reusable-component/
import classes from "./ToggleSwitch.module.scss"

const ToggleSwitch = (props) => {
  return (
    <div className={classes["toggle-switch"]}>
      <input
        type="checkbox"
        className={classes["toggle-switch-checkbox"]}
        name={props.Name}
        id={props.Name}
      />
      <label className={classes["toggle-switch-label"]} htmlFor={props.Name}>
        <span className={classes["toggle-switch-inner"]} data-yes="ON" data-no="OFF"/>
        <span className={classes["toggle-switch-switch"]} />
      </label>
    </div>
  );
};

export default ToggleSwitch;
