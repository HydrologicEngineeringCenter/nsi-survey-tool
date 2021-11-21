import AutoComplete from "@mui/material/Autocomplete"
import { useRef } from "react"
import { connect } from 'redux-bundler-react';
import {
  TextField
} from '@material-ui/core';

const AsyncSurveyorAutocomplete = props => {

  const autocompleteRef = useRef()
  const {
    createSurveyUsersList: usersList,
    doSendRequestSearchUser,
    doCreateSurveyClearSelectedUser,
  } = props

  //  TODO put a throttle somewhere so we don't ddos the backend
  return (
    <div className={'async-surveyors'}>
      <AutoComplete
        id="user-surveyor-autocomplete"
        size="small"
        options={usersList}
        ref={autocompleteRef}
        getOptionLabel={option => option.userName}

        onInputChange={(e, newInputValue) => {
          doCreateSurveyClearSelectedUser()
          doSendRequestSearchUser(newInputValue)
        }}

        renderInput={params => {
          return (
            <TextField
              {...params}
              label="Select a user"
              fullWidth
            />
          );
        }}

      // onChange={(_, v) => {
      //   if (v) {
      //     doSendRequestSearchUser(v);
      //   }
      // }}
      />
    </div>
  )
}


export default connect(
  'selectCreateSurveyUsersList',
  'doSendRequestSearchUser',
  'doCreateSurveyClearSelectedUser',
  AsyncSurveyorAutocomplete,
)
