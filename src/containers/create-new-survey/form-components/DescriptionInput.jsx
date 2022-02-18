import React from 'react';
import classes from "./NameInput.module.css";
import TextField from '@material-ui/core/TextField';

const DescriptionInput = (props) => {
  return (
    <TextField
      id="survey-description-input"
      label="Description"
      defaultValue=""
      variant="outlined"
      inputRef={props.inputRef}
    />
  );
};

export default DescriptionInput;
