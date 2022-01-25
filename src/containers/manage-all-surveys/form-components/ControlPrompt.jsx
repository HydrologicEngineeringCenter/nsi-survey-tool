import { useEffect, Fragment } from "react"
import { connect } from "redux-bundler-react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"
import AsyncSurveyorAutocomplete from "./../../components/SurveyorPrompt/AsyncSurveyorAutocomplete"
import SurveyorsList from "./../../components/SurveyorPrompt/SurveyorsList"
import SelectButton from "./../../components/SelectButton/SelectButton"

// TODO refactor common components
const ControlPrompt = props => {
  const {
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    initActive,
    survey_selectedSurvey,
  } = props

  return (
    <Fragment>
      <Box sx={{ margin: 1 }}>
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
          <Card className={"surveyors-container"}>
            <SurveyorsList showDelete={true} />
          </Card>
        </Typography>
      </Box>
    </Fragment >
  )
}

export default connect(
  "doSendRequestGetSurveyMembers",
  "doUser_sendRequestAddSurveyor",
  "selectUser_selectedUser",
  "selectSurvey_selectedSurvey",
  ControlPrompt
)
