import { Fragment } from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ActiveSurveySwitch from "./ActiveSurveySwitch/ActiveSurveySwitch"

// TODO refactor - refactor common components
const ControlPrompt = props => {
  const { initActive } = props
  return (
    <Fragment>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          <Paper>
            Edit Survey
            <ActiveSurveySwitch initActive={initActive} />
          </Paper>
        </Typography>
      </Box>
    </Fragment >
  )
}

export default ControlPrompt
