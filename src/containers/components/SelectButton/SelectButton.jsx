import classes from "./SelectButton.module.css";
import Button from "@material-ui/core/Button"

const SelectButton = (props) => {
  const { children } = props;

  return (
    <div className={classes.container}>
      <Button variant="contained" onClick={props.onClick}>{children}</Button>
    </div>
  );
};

export default SelectButton;
