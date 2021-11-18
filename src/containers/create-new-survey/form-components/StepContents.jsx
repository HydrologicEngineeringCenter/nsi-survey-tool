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

/**
 *
 * @returns Generates JSX element containing content of step
 */
const StepContents = (props) => {

  const {
    createSurveyStep: step,
    nameInputRef,
    descriptionInputRef,
    activeSwitchRef,
    setElements
  } = props;


  // component contents
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

    case CREATE_SURVEY_STEP.POINTS:
      return (
        <Fragment>
          {/* <ButtonHelp>Add Survey Points</ButtonHelp> */}
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
          <ButtonHelp>Add Surveyors</ButtonHelp>
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
  StepContents
)
