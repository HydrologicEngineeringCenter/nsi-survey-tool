import { useEffect, Fragment } from "react"
import { connect } from "redux-bundler-react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"
import AsyncSurveyorAutocomplete from "./AsyncSurveyorAutocomplete"
import SurveyorsList from "./SurveyorsList/SurveyorsList"
import ButtonHelp from "./ButtonHelp/ButtonHelp"

// TODO refactor common components
const ControlPrompt = props => {
  const {
    doSendRequestGetSurveyMembers,
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    initActive,
    surveyId
  } = props

  return (
    <Fragment>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Edit Survey
          <ActiveSurveySwitch initActive={initActive} />
          <AsyncSurveyorAutocomplete />
          <p />
          <ButtonHelp onClick={_ =>
            doUser_sendRequestAddSurveyor(
              surveyId,
              user_selectedUser.userId
            )}>Add Surveyors
          </ButtonHelp>
          <p />
          <p />
          <Card className={"surveyors-container"}>
            <SurveyorsList surveyId={surveyId} />
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
  ControlPrompt
)
