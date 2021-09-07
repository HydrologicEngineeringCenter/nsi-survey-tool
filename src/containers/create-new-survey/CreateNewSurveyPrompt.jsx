import React, { useState, Fragment } from "react";
import Modal from "../components/UI/Modal";
import NameInput from "./form-components/NameInput";
import ActiveSurvey from "./form-components/ActiveSurvey";
import ButtonHelp from "./form-components/ButtonHelp";
import SurveyorsList from "../create-new-survey/form-components/SurveyorsList";
import ActionButtons from "./form-components/ActionButtons";
import FunctionTitle from "./form-components/FunctionTitle";
import { connect } from 'redux-bundler-react';

import classes from "./CreateNewSurveyPrompt.module.css";
// import Card from "../components/UI/Card";
import Card from "@material-ui/core/Card";

import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Uploader from "./form-components/Uploader";

const NAME_INPUT = "NAME_INPUT";

const getSteps = () => {
  // stepper header
  return ["Input basic survey info", "Add survey points", "Add surveyors"];
};

const getStepContent = (step) => {
  // component contents
  switch (step) {
    
    case 0:
      return (
        <Card className={classes.card}>
          <NameInput />
          <p />
          <p />
          <ActiveSurvey />
        </Card>
      );

    case 1:
      return (
        <Fragment>
          {/* <ButtonHelp>Add Survey Points</ButtonHelp> */}
          <p />
          <p />
          <Uploader />
          <p />
          <p />
          <p />
          <p />
        </Fragment>
      );

    case 2:
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
};

const NewSurveyPrompt = (props) => {
  const { flagCreateSurveyValidName } = props;

  //////////////////////
  //  Handling stepper
  //////////////////////
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //////////////////////
  //
  //////////////////////

  const handleCreateSurvey = () => {};

  return (
    <Modal onClose={props.onClose}>
      <div className="modal-header">
        <FunctionTitle>Create New Survey</FunctionTitle>
      </div>

      <div className="modal-body">
        {/* <form className={classes["create-new-survey-modal"]}> */}
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <p />
                <p />
                <p />
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      // color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}

          {/* <ActionButtons /> */}
        </Stepper>
        {/* </form> */}
      </div>
    </Modal>
  );
};

export default connect("selectCreateSurveyInvalidName", NewSurveyPrompt);
