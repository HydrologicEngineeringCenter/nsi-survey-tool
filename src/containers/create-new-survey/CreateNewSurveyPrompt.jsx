import Modal from "../components/UI/Modal";
import NameInput from "./form-components/NameInput";
import ActiveSurvey from "./form-components/ActiveSurvey";
import ButtonHelp from "./form-components/ButtonHelp";
import SurveyorsList from "../create-new-survey/form-components/SurveyorsList";
import ActionButtons from "./form-components/ActionButtons";
import FunctionTitle from "./form-components/FunctionTitle";

import classes from "./CreateNewSurveyPrompt.module.css";
import Card from "../components/UI/Card";
import { Stepper } from "@material-ui/core";

const NAME_INPUT = "NAME_INPUT";

const getSteps = () => {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

const getStepContent = step => {
  switch(step) {
    case 0:
      return "Input survey name";
    default:
      return "";
  };
};

const NewSurveyPrompt = (props) => {

  const [activeStep, setActiveStep] = React.useState(NAME_INPUT);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <Modal onClose={props.onClose}>
      <form className={classes["create-new-survey-modal"]}>
        <Stepper>

        
          <FunctionTitle>Create New Survey</FunctionTitle>
          <NameInput />
          <ActiveSurvey />
          <ButtonHelp>Add Survey Points</ButtonHelp>
          <Card className={classes["surveyors-container"]}>
            <p />
            <ButtonHelp>Add Surveyors</ButtonHelp>
            <p />
            <SurveyorsList />
            <p />
          </Card>
          <ActionButtons />

        </Stepper>

      </form>
    </Modal>
  );
};

export default NewSurveyPrompt;
