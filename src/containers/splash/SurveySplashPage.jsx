import React, { Fragment } from "react";
import { connect } from "redux-bundler-react";
import NavBar from "../components/navbar/NavBar";
import classes from "./SurveySplashPage.module.css";
// import SplashPageDrawer from "./SplashPageDrawer";
// import Card from "../components/UI/Card";

// incons from https://fonts.google.com/icons
import CreateNewSvg from "../../resources/survey-splash/add_box_white_24dp.svg";
import ModifyExistingSvg from "../../resources/survey-splash/edit_white_24dp.svg";
import ManageAllSvg from "../../resources/survey-splash/settings_white_24dp.svg";

import CreateNewText from "../../resources/survey-splash/update-existing-survey-2@1x.png";
import ModifyExistingText from "../../resources/survey-splash/update-existing-survey-1@1x.png";
import ManageAllText from "../../resources/survey-splash/update-existing-survey@1x.png";

import Button from "./Button";
import Title from "./Title";

function SurveySplashPage(props) {
  const { doUpdateUrl, authNSIToken } = props;

  if (!authNSIToken) {
    doUpdateUrl("/nsi-survey/splash"); // TODO - reroute to main login on final
  }

  return (
    <div className={classes["container-center-vertical"]}>
      <NavBar />
      <div className={classes["overlap-group"]}>
        {/* <Title /> */}
        <div className={classes["buttons"]}>
          <Button vector={CreateNewSvg} text="Create New Survey" />
          <Button vector={ModifyExistingSvg} text="Modify Existing Survey" />
          <Button vector={ManageAllSvg} text="Manage All Surveys" />
        </div>
      </div>
    </div>
  );
}

export default connect("doUpdateUrl", "selectAuthNSIToken", SurveySplashPage);
