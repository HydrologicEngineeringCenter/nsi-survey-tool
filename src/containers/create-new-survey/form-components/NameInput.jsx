import React, { useEffect } from 'react';
import { connect } from 'redux-bundler-react'
import TextField from '@material-ui/core/TextField';

const NameInput = props => {
  const {
    survey_flagValidSurveyName,
    doSurvey_sendRequestValidateSurveyName,
    doSurvey_updateFlagValidName,
    inputRef
  } = props

  const handleChange = e => {
    doSurvey_sendRequestValidateSurveyName(e.target.value)
  }

  useEffect(_ => {
    doSurvey_updateFlagValidName(true)
  }, [])

  return (
    <TextField
      id="survey-name-input"
      label="Survey Name"
      defaultValue=""
      variant="outlined"
      inputRef={inputRef}
      onChange={handleChange}
      error={!survey_flagValidSurveyName}
      helperText={(!survey_flagValidSurveyName) ? "Invalid survey name" : ""}
    />
  );
};

export default connect(
  "selectSurvey_flagValidSurveyName",
  "doSurvey_sendRequestValidateSurveyName",
  "doSurvey_updateFlagValidName",
  NameInput
)
