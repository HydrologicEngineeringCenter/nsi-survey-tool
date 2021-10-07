import React, { useState, Fragment, useRef } from "react";
import Modal from "../components/UI/Modal";
import { connect } from 'redux-bundler-react';
import FunctionTitle from "./form-components/FunctionTitle";
import classes from "./CreateNewSurveyPrompt.module.css";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import StepContents from "./form-components/StepContents";

import CREATE_SURVEY_STEP from "../../stores/newSurveyStep";

/**
 * 
 * @returns array containing header for each step
 */
const stepHeaders = () => {
  // stepper header
  return ["Input basic survey info", "Add survey points", "Add surveyors"];
};

const NewSurveyPrompt = (props) => {

  const { createSurveyStep, doStoreCreateSurveyStep } = props;

  //////////////////////
  // Input refs
  //////////////////////

  const nameInputRef = useRef();

  //////////////////////
  //  Handling stepper
  //////////////////////

  const handleNext = () => {
    doStoreCreateSurveyStep(createSurveyStep + 1);
  }

  const handleBack = () => doStoreCreateSurveyStep(createSurveyStep - 1);

  const handleReset = () => {
  };

  //////////////////////
  // Confirm button handlers
  //////////////////////

  const handleBasicInfo = () => {

    console.log('handleBasicInfo')
    const enteredSurveyName = nameInputRef.current.value;
    console.log(enteredSurveyName);

    // post(REQUEST_PARAMS.CREATE_NEW_SURVEY)

    handleNext();
  };

  const handleLoadPoints = () => {
  };

  const handleAddSurveyors = () => {
  };

  /**
   * Selector for handler specific to each step
   * @returns 
   */
  const handleConfirm = () => {
      switch (createSurveyStep) {
        case CREATE_SURVEY_STEP.BASIC_INFO:
        console.log('case CREATE_SURVEY_STEP.BASIC_INFO')
        handleBasicInfo()
          // return handleBasicInfo;
        case CREATE_SURVEY_STEP.POINTS:
          return handleLoadPoints;
        case CREATE_SURVEY_STEP.SURVEYORS:
          return handleAddSurveyors;
        default:
          throw Error("Unable to determine CREATE_SURVEY_STEP")
    }
  }


  //////////////////////
  //
  //////////////////////

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-header">
        <FunctionTitle>Create New Survey</FunctionTitle>
      </div>

      <div className="modal-body">
        <Stepper activeStep={createSurveyStep} orientation="vertical">

          {stepHeaders().map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <StepContents nameInputRef={nameInputRef} />
                {/* {stepContents(index)} */}
                <p />
                <p />
                <p />
                <div className={classes.actionsContainer}>
                  <div>

                    <Button // back button
                      disabled={createSurveyStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>

                    <Button // next button
                      variant="contained"
                      // color="primary"
                      onClick={ // interact with backend onclick
                        handleConfirm
                        // handleNext
                      }
                      className={classes.button}
                    >
                      {createSurveyStep === stepHeaders().length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}

        </Stepper>
      </div>
    </Modal>
  );
};

export default connect(
  'selectCreateSurveyStep',
  'doStoreCreateSurveyStep',
  NewSurveyPrompt);
