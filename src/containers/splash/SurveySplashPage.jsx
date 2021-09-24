import React, { createContext, Fragment, useState } from "react";
import { connect } from "redux-bundler-react";
import NavBar from "../components/navbar/NavBar";
import classes from "./SurveySplashPage.module.css";

// incons from https://fonts.google.com/icons
import CreateNewSvg from "../../resources/survey-splash/add_box_white_24dp.svg";
import ModifyExistingSvg from "../../resources/survey-splash/edit_white_24dp.svg";
import ManageAllSvg from "../../resources/survey-splash/settings_white_24dp.svg";

import Button from "./Button";
import CreateNewSurveyPrompt from "../create-new-survey/CreateNewSurveyPrompt";

function SurveySplashPage(props) {
  const { doUpdateUrl, doAuthFetchTokens, authNSIToken } = props;

  if (!authNSIToken) {

    console.log("Before auth");
    console.log("************");
    console.log(authNSIToken);
    doAuthFetchTokens();

    console.log("After auth");
    console.log("************");
    console.log(authNSIToken)

    doUpdateUrl("/nsi-survey/"); // TODO - reroute to main login on final
  }

  const [flagShowCreateSurvey, setFlagShowCreateSurvey] = useState(false);

  const showCreateSurvey = () => {
    setFlagShowCreateSurvey(true);
  };

  const hideCreateSurvey = () => {
    setFlagShowCreateSurvey(false);
  };

  return (
    <div className={classes["container-center-vertical"]}>
      {flagShowCreateSurvey && (
        <CreateNewSurveyPrompt onClose={hideCreateSurvey} />
      )}
      <NavBar />
      <div className={classes["overlap-group"]}>
        <div className={classes["buttons"]}>
          <Button
            vector={CreateNewSvg}
            text="Create New Survey"
            onClick={showCreateSurvey}
          />
          <Button vector={ModifyExistingSvg} text="Modify Existing Survey" />
          <Button vector={ManageAllSvg} text="Manage All Surveys" />
        </div>
      </div>
    </div>
  );
}

export default connect(
  "doUpdateUrl",
  "doAuthFetchTokens",
  "selectAuthNSIToken",
  SurveySplashPage
);
