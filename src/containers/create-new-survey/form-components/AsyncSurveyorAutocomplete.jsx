import AutoComplete from "@mui/material/Autocomplete"
import { useRef } from "react"
import { connect } from 'redux-bundler-react';
import {
  TextField
} from '@material-ui/core';

const AsyncSurveyorAutocomplete = props => {

  const autocompleteRef = useRef()
  const {
    usersList,
    doSendRequestSearchUser,
    doUser_updateSelectedUser,
    user_selectedUser,
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

        isOptionEqualToValue={(option, value) => {
          if (option.userId === value.userId) {
            return true
          } else {
            return false
          }
        }}

        // selectedUser is value
        value={user_selectedUser}
        onChange={(_, v) => {
          if (v) {
            doUser_updateSelectedUser(v);
          }
        }}
      />
    </div>
  )
}


export default connect(
  'selectUsersList',
  'doSendRequestSearchUser',
  'doUser_updateSelectedUser',
  'selectUser_selectedUser',
  AsyncSurveyorAutocomplete,
)
