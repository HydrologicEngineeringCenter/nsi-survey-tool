import { useState, Fragment } from "react"
import { connect } from "redux-bundler-react"
import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  AppBar
} from "@material-ui/core"

import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"
import AsyncSurveyorAutocomplete from "./../../components/SurveyorPrompt/AsyncSurveyorAutocomplete"
import SurveyorsList from "./../../components/SurveyorPrompt/SurveyorsList"
import SelectButton from "./../../components/SelectButton/SelectButton"
import TabPanel from "./TabPanel"
import Uploader from "../../components/Uploader/Uploader"
import ElementTable from "./ElementTable"

import classes from "./ControlPrompt.module.css"

// TODO customize css
const ControlPrompt = props => {
  const {
    doUser_sendRequestAddSurveyor,
    user_selectedUser,
    initActive,
    survey_selectedSurvey: survey_selected,
    doSurvey_downloadReport,
    user_userIsAdminOrOwnerOfSelectedSurvey: higherControl,
    doElement_sendRequestGetElements,
    doSendRequestGetSurveyMembers,
    doElement_insertElements,
  } = props

  const [value, setValue] = useState(0)
  const STEP_INDEX = {
    GENERAL: 0,
    SURVEYOR: 1,
    ELEMENT_VIEW: 2,
    ELEMENT_INSERT: 3,
    ASSIGNMENT: 4,
  }

  const handleChange = (_, newValue) => {
    switch (newValue) {
      case STEP_INDEX.SURVEYOR:
        doSendRequestGetSurveyMembers(survey_selected)
        break
      case STEP_INDEX.ELEMENT_VIEW:
        doElement_sendRequestGetElements(survey_selected)
        break
      case STEP_INDEX.ELEMENT_INSERT:
        break
    }
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
      {higherControl &&
        <Card className={"surveyors-container"}>

          <Typography variant="h6" gutterBottom component="div">
            Edit Survey
          </Typography>

          <Box sx={{ maxWidth: 650, bgcolor: 'background.paper' }}>
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
                <Tab label={survey_selected ? survey_selected.title : ""} {...a11yProps(0)} />
                <Tab label="Surveyors" {...a11yProps(1)} />
                <Tab label="View Elements" {...a11yProps(1)} />
                <Tab label="Insert Elements" {...a11yProps(1)} />
                <Tab label="Assignments" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={STEP_INDEX.GENERAL}>
              <ActiveSurveySwitch initActive={initActive} />
              <p />
              <p />
              <SelectButton onClick={doSurvey_downloadReport}>Download</SelectButton>
              <p />
              <p />
            </TabPanel>

            <TabPanel value={value} index={STEP_INDEX.SURVEYOR}>
              <AsyncSurveyorAutocomplete />
              <p />
              <p />
              <SelectButton onClick={_ =>
                doUser_sendRequestAddSurveyor(
                  survey_selected.id,
                  user_selectedUser.userId
                )}>Add Surveyors
              </SelectButton>
              <p />
              <p />
              <SurveyorsList />
            </TabPanel>

            <TabPanel value={value} index={STEP_INDEX.ELEMENT_VIEW}>
              <ElementTable />
            </TabPanel>

            <TabPanel value={value} index={STEP_INDEX.ELEMENT_INSERT}>
              <Uploader />
              <p />
              <p />
              <SelectButton onClick={doElement_insertElements}>Download</SelectButton>
            </TabPanel>

          </Box>
        </Card>
      }

      {/* Higher level control would not be available to survey member*/}
      {
        !higherControl &&
        <Typography>
          User is not an admin or owner of survey
        </Typography>
      }
    </Fragment >
  )
}

export default connect(
  "doSendRequestGetSurveyMembers",
  "doUser_sendRequestAddSurveyor",
  "selectUser_selectedUser",
  "selectSurvey_selectedSurvey",
  "doSurvey_downloadReport",
  "selectUser_userIsAdminOrOwnerOfSelectedSurvey",
  "doElement_sendRequestGetElements",
  "doElement_insertElements",
  ControlPrompt
)
