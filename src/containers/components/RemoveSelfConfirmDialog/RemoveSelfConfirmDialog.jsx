import { Fragment } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@material-ui/core'
import { connect } from "redux-bundler-react"

const RemoveSelfConfirmDiaglog = props => {
  const { doUser_flipOwner, user, onClose } = props

  const handleConfirm = user => {
    doUser_flipOwner(user)
    onClose()
  }

  return (
    <Fragment>
      <Dialog open={true} maxWidth="sm" onBackdropClick={onClose} fullWidth>
        <DialogTitle>Confirm removing ownership from yourself?</DialogTitle>
        <Box position="absolute" top={0} right={0}>
        </Box>
        <DialogContent>
          <Typography>You will not be able to manage this survey without ownership.</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" onClick={_ => handleConfirm(user)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default connect(
  'doUser_flipOwner',
  RemoveSelfConfirmDiaglog
)
