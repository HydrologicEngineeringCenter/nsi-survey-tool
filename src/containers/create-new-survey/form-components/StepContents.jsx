import React from "react"
import Card from "@material-ui/core/Card";
import NameInput from "./NameInput";
import SurveyorsList from "./../../components/SurveyorPrompt/SurveyorsList";
import SelectButton from "./../../components/SelectButton/SelectButton";
import Uploader from "../../components/Uploader/Uploader";
import classes from "../CreateNewSurveyPrompt.module.css";
import { Fragment } from "react";
import { connect } from 'redux-bundler-react';
import CREATE_SURVEY_STEP from "../../../stores/newSurveyStep";
import DescriptionInput from "./DescriptionInput";
import AsyncSurveyorAutocomplete from "./../../components/SurveyorPrompt/AsyncSurveyorAutocomplete"

/**
 *
 * @returns Generates JSX element containing content of step
 */
const StepContents = (props) => {

  const {
    createSurveyStep: step,
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    survey_selectedSurvey,
    nameInputRef,
    descriptionInputRef,
  } = props;

  switch (step) {

    case CREATE_SURVEY_STEP.BASIC_INFO:
      return (
        <Card className={classes.card}>
          <NameInput inputRef={nameInputRef} />
          <p />
          <p />
          <DescriptionInput inputRef={descriptionInputRef} />
          <p />
        </Card>
      )

    // TODO add loading graphic
    case CREATE_SURVEY_STEP.POINTS:
      return (
        <Fragment>
          <p />
          <p />
          <Uploader />
          <p />
          <p />
          <p />
          <p />
        </Fragment>
      );

    case CREATE_SURVEY_STEP.SURVEYORS:
      return (
        <Fragment>
          <AsyncSurveyorAutocomplete />
          <p />
          <SelectButton onClick={_ =>
            doUser_sendRequestAddSurveyor(
              survey_selectedSurvey.id,
              user_selectedUser.userId
            )}>Add Surveyors
          </SelectButton>
          <p />
          <p />
          <Card className={classes["surveyors-container"]}>
            <SurveyorsList />
          </Card>
        </Fragment>
      );

    default:
      return;
  }
}

export default connect(
  'selectCreateSurveyStep',
  'doUser_sendRequestAddSurveyor',
  'selectUser_selectedUser',
  'selectSurvey_selectedSurvey',
  StepContents
)
