import { useState, Fragment } from "react"
import { connect } from "redux-bundler-react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"
import AsyncSurveyorAutocomplete from "./../../components/SurveyorPrompt/AsyncSurveyorAutocomplete"
import SurveyorsList from "./../../components/SurveyorPrompt/SurveyorsList"
import SelectButton from "./../../components/SelectButton/SelectButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import TabPanel from "./TabPanel"
import AppBar from "@material-ui/core/AppBar"
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

  const [value, setValue] = useState(0)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  const a11yProps = idx => {
    return {
      id: `scrollable-auto-tab-${idx}`,
      'aria-controls': `scrollable-auto-tabpanel-${idx}`,
    }
  }

  return (
    <Fragment>
      <Card className={"surveyors-container"}>

        <Typography variant="h6" gutterBottom component="div">
          Edit Survey
        </Typography>

        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={survey_selectedSurvey ? survey_selectedSurvey.id : ""} {...a11yProps(0)} />
            <Tab label="Change Surveyors" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ActiveSurveySwitch initActive={initActive} />
          <p />
          <p />
          <SelectButton onClick={doSurvey_downloadReport}>Download</SelectButton>
          <p />
          <p />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <AsyncSurveyorAutocomplete />
          <p />
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
        </TabPanel>

      </Card>
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
