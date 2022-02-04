import React from 'react';
import TextField from '@material-ui/core/TextField';

const NameInput = props => {
  const { inputRef } = props
  return (
    <TextField
      id="survey-name-input"
      label="Survey Name"
      defaultValue=""
      variant="outlined"
      inputRef={inputRef}
    />
  );
};

export default NameInput;
