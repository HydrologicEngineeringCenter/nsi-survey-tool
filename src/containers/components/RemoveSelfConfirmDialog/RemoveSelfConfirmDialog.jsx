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
  const { doUser_flipOwner, lastOwner, user, onClose } = props

  const handleConfirm = user => {
    doUser_flipOwner(user)
    onClose()
  }

  return (
    <Fragment>
      <Dialog open={true} maxWidth="sm" onBackdropClick={onClose} fullWidth>
        <DialogTitle>{
          !lastOwner ? "Confirm removing ownership from yourself?" : "Invalid action!"
        }</DialogTitle>
        <Box position="absolute" top={0} right={0}>
        </Box>
        <DialogContent>
          <Typography>{
            !lastOwner ? "You will not be able to manage this survey without ownership." :
              "You are the last owner, please assign an additional owner before removing your ownership status."
          }</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={onClose}>
            {
              !lastOwner ? "Cancel" : "Close"
            }
          </Button>
          {
            !lastOwner &&
            <Button color="secondary" variant="contained" onClick={_ => handleConfirm(user)}>
              Confirm
            </Button>
          }
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default connect(
  'doUser_flipOwner',
  RemoveSelfConfirmDiaglog
)
