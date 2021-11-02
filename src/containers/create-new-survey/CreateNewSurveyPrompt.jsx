import React, { useState, Fragment, useRef, useEffect } from "react";
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

import SurveyApi from "../../lib/rest/api";
import allValidProperties from "../../utils/obj";
import REQUEST_PARAMS from "../../stores/requestParams";
import CREATE_SURVEY_STEP from "../../stores/newSurveyStep";
import { InvalidRequestError } from "../../lib/errors/exceptions";

const stepHeaders = ["Input basic survey info", "Add survey points", "Add surveyors"];

const NewSurveyPrompt = (props) => {

  const {
    createSurveyStep,
    doStoreCreateSurveyStep,
    authAccessToken,
    doSendRequestCreateSurvey
  } = props;
  const backend = new SurveyApi()

  /*******************
   * Refs + states
   *******************/
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const activeSurveySwitchRef = useRef();
  const surveyorNameInputdRef = useRef();
  const [elements, setElements] = useState() // survey elements for upload
  const [surveyId, setSurveyId] = useState() // store guid from backend response
  const [createSurveyIP, setCreateSurveyIP] = useState(false)
  const [fetchParams, setFetchParams] = useState()

  /*******************
   * Handling stepper
   *******************/
  const handleNext = () => {
    // reset if already on last step
    doStoreCreateSurveyStep(createSurveyStep === stepHeaders.length - 1 ? 0 : createSurveyStep + 1);
  }

  const handleBack = () => doStoreCreateSurveyStep(createSurveyStep - 1);

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
    const enteredSurveyName = nameInputRef.current.value;
    const enteredSurveyDescription = descriptionInputRef.current.value;
    const enteredActiveSwitch = activeSurveySwitchRef.current.checked;
    const requestParams = Object.assign(REQUEST_PARAMS.CREATE_NEW_SURVEY, {
      body: {
        title: enteredSurveyName,
        description: enteredSurveyDescription,
        active: enteredActiveSwitch,
      }
    })

    // Request parameter validation
    if (allValidProperties(requestParams)) {
      doSendRequestCreateSurvey(backend, requestParams, setSurveyId)
    } else {
      throw new InvalidRequestError("Invalid request param to backend API");
    }

    handleNext()
  }


  /**
   * Add survey elements
   */
  const handleLoadPoints = () => {

    const requestBody = elements.generateRequestBody(surveyId)
    const requestParams = Object.assign(REQUEST_PARAMS.INSERT_SURVEY_ELEMENTS, {
      body: requestBody
    })

    // Request parameter validation
    if (allValidProperties(requestParams)) {
      backend.send(authAccessToken, requestParams, responseHandler)
    } else {
      throw new InvalidRequestError("Invalid request param to backend API");
    }

    generateRequestBody(surveyId)
    handleNext();
  };

  const handleAddSurveyors = () => {
    handleNext();
  };

  /**
   * Selector for handler specific to each step
   * @returns
   */
  const handleConfirm = () => {
    switch (createSurveyStep) {
      case CREATE_SURVEY_STEP.BASIC_INFO:
        handleBasicInfo()
      // return handleBasicInfo;
      case CREATE_SURVEY_STEP.POINTS:
        // TODO - implement reset button - send a request to delete created survey
        return handleLoadPoints;
      case CREATE_SURVEY_STEP.SURVEYORS:
        return handleAddSurveyors;
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

          {stepHeaders.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <StepContents
                  nameInputRef={nameInputRef}
                  descriptionInputRef={descriptionInputRef}
                  activeSwitchRef={activeSurveySwitchRef}
                  setElements={setElements}
                />
                {/* {stepContents(index)} */}
                <p />
                <p />
                <p />
              </StepContent>
            </Step>
          ))}

          <div className={classes.actionsContainer}>
            <div>

              {/* cancel button instead of back
                    implementing the back button would mean
                    rolling back entry that was already sent to the backend db */}
              <Button
                // disabled={createSurveyStep === 0}
                onClick={props.onClose}
                className={classes.button}
              >
                Cancel
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
                {createSurveyStep === stepHeaders.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>

        </Stepper>
      </div>
    </Modal>
  );
};

export default connect(
  'selectCreateSurveyStep',
  'doStoreCreateSurveyStep',
  'selectAuthAccessToken',
  'doSendRequestCreateSurvey',
  NewSurveyPrompt);
