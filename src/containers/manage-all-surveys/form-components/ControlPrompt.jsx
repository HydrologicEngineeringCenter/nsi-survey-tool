import SurveyorsList from "./SurveyorsList"
import { Fragment } from "react"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

// TODO refactor - refactor common components
const ControlPrompt = _ => {
  return (
    <Fragment>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Edit Survey
        </Typography>
      </Box>
    </Fragment>
  )
}

export default ControlPrompt
