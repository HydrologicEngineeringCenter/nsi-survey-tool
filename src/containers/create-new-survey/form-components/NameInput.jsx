import React from 'react';
import TextField from '@material-ui/core/TextField';

const NameInput = (props) => {
  return (
    <TextField
      id="survey-name-input"
      label="Survey Name"
      defaultValue=""
      variant="outlined"
      inputRef={props.inputRef}
    />
  );
};

export default NameInput;
