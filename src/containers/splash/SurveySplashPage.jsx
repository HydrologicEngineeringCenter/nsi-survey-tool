import React, { useState } from "react";
import { connect } from "redux-bundler-react";
import NavBar from "../components/navbar/NavBar";
import classes from "./SurveySplashPage.module.css";
import SurveyApi from "../../lib/rest/api"

// incons from https://fonts.google.com/icons
import CreateNewSvg from "../../resources/survey-splash/add_box_white_24dp.svg";
import ModifyExistingSvg from "../../resources/survey-splash/edit_white_24dp.svg";
import ManageAllSvg from "../../resources/survey-splash/settings_white_24dp.svg";

import Button from "./Button";
import CreateNewSurveyPrompt from "../create-new-survey/CreateNewSurveyPrompt";
import ChooseActiveSurveyPrompt from "../choose-active-survey/ChooseActiveSurveyPrompt";
import ManageAllSurveysPrompt from "../manage-all-surveys/ManageAllSurveysPrompt";

function SurveySplashPage(props) {
  const {
    doUpdateUrl,
    authAccessToken,
    doSurvey_sendRequestGetSurveys,
    doStoreBackend,
    doManageSurvey_dispatchShouldInitControlPromptArray,
  } = props;

  if (!authAccessToken) {
    doUpdateUrl("/nsi-survey/");
  }

  const [flagShowCreateSurvey, setFlagShowCreateSurvey] = useState(false);
  const [flagChooseActiveSurvey, setFlagChooseActiveSurvey] = useState(false);
  const [flagManageAllSurveys, setFlagManageAllSurveys] = useState(false);

  const backend = new SurveyApi()
  doStoreBackend(backend)

  const showCreateSurvey = () => {
    setFlagShowCreateSurvey(true)
  };

  const hideCreateSurvey = () => {
    setFlagShowCreateSurvey(false);
  };

  const showChooseActiveSurvey = () => {
    doSurvey_sendRequestGetSurveys()
    setFlagChooseActiveSurvey(true)
  };

  const hideChooseActiveSurvey = () => {
    setFlagChooseActiveSurvey(false);
  };

  const showManageAllSurveys = () => {
    doManageSurvey_dispatchShouldInitControlPromptArray()
    doSurvey_sendRequestGetSurveys()
    setFlagManageAllSurveys(true)
  };

  const hideManageAllSurveys = () => {
    setFlagManageAllSurveys(false);
  };

  return (
    <div className={classes["container-center-vertical"]}>

      {flagShowCreateSurvey && (
        <CreateNewSurveyPrompt onClose={hideCreateSurvey} />
      )}

      {flagChooseActiveSurvey && (
        <ChooseActiveSurveyPrompt onClose={hideChooseActiveSurvey} />
      )}

      {flagManageAllSurveys && (
        <ManageAllSurveysPrompt onClose={hideManageAllSurveys} />
      )}

      <NavBar />

      <div className={classes["overlap-group"]}>
        <div className={classes["buttons"]}>
          <Button
            vector={CreateNewSvg}
            text="Create New Survey"
            onClick={showCreateSurvey}
          />
          <Button
            vector={ModifyExistingSvg}
            text="Choose Active Survey"
            onClick={showChooseActiveSurvey}
          />
          <Button
            vector={ManageAllSvg}
            text="Manage All Surveys"
            onClick={showManageAllSurveys}
          />
        </div>
      </div>
    </div>
  );
}

export default connect(
  "doUpdateUrl",
  "selectAuthAccessToken",
  "doSurvey_sendRequestGetSurveys",
  "doStoreBackend",
  "doManageSurvey_dispatchShouldInitControlPromptArray",
  SurveySplashPage
);
