import React, { useState, Fragment, useRef, useEffect } from "react"
import Modal from "../components/UI/Modal"
import { connect } from 'redux-bundler-react'
import FunctionTitle from "../components/UI/FunctionTitle"
import classes from "./CreateNewSurveyPrompt.module.css"
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import StepContents from "./form-components/StepContents"

import allValidProperties from "../../utils/obj"
import REQUEST_PARAMS from "../../stores/requestParams"
import CREATE_SURVEY_STEP from "../../stores/newSurveyStep"
import { InvalidRequestError } from "../../lib/errors/exceptions"

const stepHeaders = ["Input basic survey info", "Add survey points", "Add surveyors"];

const NewSurveyPrompt = (props) => {

  const {
    createSurveyStep,
    doSendRequestCreateSurvey,
    doElement_sendRequestInsertElements,
    doCreateNew_createSurveyStep,
    doUser_shouldUpdateSurveyMembers,
    doStoreCreateSurveyStep,
  } = props

  /*******************
   * Refs + states
   *******************/
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const activeSurveySwitchRef = useRef();

  /*******************
   * Handling backend interactions
   *******************/

  /**
   * Create new survey
   *  function gets input data from the three components, validate,
   *  construct a request and send it to the backend
   */
  const handleBasicInfo = _ => {
    // get values from input fields
    // a little business logic pollution in this component wouldn't hurt anyone
    const enteredSurveyName = nameInputRef.current.value;
    const enteredSurveyDescription = descriptionInputRef.current.value;
    const requestParams = Object.assign(REQUEST_PARAMS.CREATE_NEW_SURVEY, {
      body: {
        title: enteredSurveyName,
        description: enteredSurveyDescription,
        active: false,
      }
    })

    // validate params
    if (allValidProperties(requestParams)) {
      doSendRequestCreateSurvey(requestParams)
    } else {
      throw new InvalidRequestError("Invalid request param to backend API");
    }
  }

  const handleCloseReset = () => {
    doCreateNew_createSurveyStep(CREATE_SURVEY_STEP.BASIC_INFO)
    props.onClose()
  };

  /**
   * Selector for handler specific to each step
   */
  const handleConfirm = () => {
    switch (createSurveyStep) {
      case CREATE_SURVEY_STEP.BASIC_INFO:
        handleBasicInfo()
        return
      case CREATE_SURVEY_STEP.POINTS:
        doElement_sendRequestInsertElements(_ => {
          doStoreCreateSurveyStep(CREATE_SURVEY_STEP.SURVEYORS)
        })
        doUser_shouldUpdateSurveyMembers()
        return
      case CREATE_SURVEY_STEP.SURVEYORS:
        handleCloseReset()
        return
      default:
        throw Error("Unable to determine CREATE_SURVEY_STEP")
    }
  }


  //////////////////////
  //  Prompt
  //////////////////////

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-header">
        <FunctionTitle>Create New Survey</FunctionTitle>
      </div>

      <div className="modal-body">
        <Stepper activeStep={createSurveyStep} orientation="vertical">

          {stepHeaders.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <StepContents
                  nameInputRef={nameInputRef}
                  descriptionInputRef={descriptionInputRef}
                  activeSwitchRef={activeSurveySwitchRef}
                />
                {/* {stepContents(index)} */}
                <p />
                <p />
                <p />
              </StepContent>
            </Step>
          ))}

          <div className={classes.actionsContainer}>
            <Fragment>

              {/* replace with a cancel button instead of back button
                    implementing the back button would mean
                    rolling back entry that was already sent to the backend db */}
              <Button
                // disabled={createSurveyStep === 0}
                onClick={handleCloseReset}
                className={classes.button}
              >
                Cancel
              </Button>

              <Button // next button
                variant="contained"
                // color="primary"
                onClick={ // interact with backend onclick
                  handleConfirm
                }
                className={classes.button}
              >
                {createSurveyStep === stepHeaders.length - 1 ? "Finish" : "Next"}
              </Button>
            </Fragment>
          </div>
        </Stepper>
      </div>
    </Modal>
  );
};

export default connect(
  'selectCreateSurveyStep',
  'doSendRequestCreateSurvey',
  'doElement_sendRequestInsertElements',
  'doCreateNew_createSurveyStep',
  "doUser_shouldUpdateSurveyMembers",
  "doStoreCreateSurveyStep",
  NewSurveyPrompt);
