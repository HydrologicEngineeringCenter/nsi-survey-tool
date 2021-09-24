import classes from "./NameInput.module.css";
import TextField from '@material-ui/core/TextField';

const NameInput = (props) => {
  return (
      <TextField
        id="survey-name-input"
        label="Survey Name"
        defaultValue=""
        variant="outlined"
        inputRef={props.ref}
      />
  );
};

export default NameInput;
