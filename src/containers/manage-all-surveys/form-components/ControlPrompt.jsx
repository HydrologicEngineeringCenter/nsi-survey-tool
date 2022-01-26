import { useEffect, Fragment } from "react"
import { connect } from "redux-bundler-react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"
import AsyncSurveyorAutocomplete from "./../../components/SurveyorPrompt/AsyncSurveyorAutocomplete"
import SurveyorsList from "./../../components/SurveyorPrompt/SurveyorsList"
import SelectButton from "./../../components/SelectButton/SelectButton"
import classes from "./ControlPrompt.module.css"

// TODO customize css
const ControlPrompt = props => {
  const {
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    initActive,
    survey_selectedSurvey,
    doSurvey_downloadReport,
  } = props

  return (
    <Fragment>
      <Box sx={{ margin: 1 }}>
        <Card className={"surveyors-container"}>
          <Typography variant="h6" gutterBottom component="div">
            Edit Survey
            <ActiveSurveySwitch initActive={initActive} />
            <p />
            <AsyncSurveyorAutocomplete />
            <p />
            <SelectButton onClick={_ =>
              doUser_sendRequestAddSurveyor(
                survey_selectedSurvey.id,
                user_selectedUser.userId
              )}>Add Surveyors
            </SelectButton>
            <p />
            <p />
            <SurveyorsList showDelete={true} />

            <p />
            <p />
            <SelectButton onClick={doSurvey_downloadReport}>Download</SelectButton>
            <p />
            <p />

          </Typography>
        </Card>
      </Box>
    </Fragment >
  )
}

export default connect(
  "doSendRequestGetSurveyMembers",
  "doUser_sendRequestAddSurveyor",
  "selectUser_selectedUser",
  "selectSurvey_selectedSurvey",
  "doSurvey_downloadReport",
  ControlPrompt
)
