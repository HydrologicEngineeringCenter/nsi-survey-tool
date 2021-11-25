import React from "react"
import Card from "@material-ui/core/Card";
import NameInput from "./NameInput";
import ActiveSurvey from "./ActiveSurvey";
import SurveyorsList from "./SurveyorsList";
import ButtonHelp from "./ButtonHelp";
import Uploader from "./Uploader";
import classes from "../CreateNewSurveyPrompt.module.css";
import { Fragment, useCallback } from "react";
import { connect } from 'redux-bundler-react';
import CREATE_SURVEY_STEP from "../../../stores/newSurveyStep";
import DescriptionInput from "./DescriptionInput";
import AsyncSurveyorAutocomplete from "./AsyncSurveyorAutocomplete"

/**
 *
 * @returns Generates JSX element containing content of step
 */
const StepContents = (props) => {

  const {
    createSurveyStep: step,
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    createSurveyId,
    nameInputRef,
    descriptionInputRef,
    activeSwitchRef,
    setElements
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
          <p />
          <ActiveSurvey inputRef={activeSwitchRef} />
        </Card>
      )

    // TODO add loading graphic
    case CREATE_SURVEY_STEP.POINTS:
      return (
        <Fragment>
          <p />
          <p />
          <Uploader setElements={setElements} />
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
          <ButtonHelp onClick={_ =>
            doUser_sendRequestAddSurveyor(
              createSurveyId,
              user_selectedUser.userId
            )}>Add Surveyors
          </ButtonHelp>
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
  'selectCreateSurveyId',
  StepContents
)
