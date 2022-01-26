import { createSelector } from "redux-bundler"
import REQUESTS from '../stores/requestParams'

const USER_ACTION = {
  CLEAR_SELECTED_USER: "USER_ACTION.CLEAR_SELECTED_USER",
  UPDATE_USERS_LIST: "USER_ACTION.UPDATE_USERS_LIST",
  UPDATE_SURVEY_MEMBERS: "USER_ACTION.UPDATE_SURVEY_MEMBERS",
  ADD_SURVEY_MEMBERS: "USER_ACTION.ADD_SURVEY_MEMBERS",
  UPDATE_SELECTED_USER: "USER_ACTION.UPDATE_SELECTED_USER",
  INVERT_USER_LIST_CHANGED_FLAG: "USER_ACTION.INVERT_USER_LIST_CHANGED_FLAG",
}

export default {
  name: 'user',

  getReducer: () => {
    const initialData = {
      usersList: [], // for autocomplete search
      surveyMembers: [], // for survey members table
      selectedUser: {
        userName: '',
        userId: null,
      },
      flagChangedUserList: false,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case USER_ACTION.CLEAR_SELECTED_USER:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doUser_updateSelectedUser: selectedUser => ({ dispatch }) => {
    dispatch({
      type: USER_ACTION.UPDATE_SELECTED_USER,
      payload: {
        'selectedUser': selectedUser
      }
    })
  },

  doUser_clearSelectedUser: () => ({ dispatch }) => {
    dispatch({
      type: USER_ACTION.CLEAR_SELECTED_USER,
      payload: {
        'selectedUser': {
          userName: '',
          userId: null,
        }
      }
    })
  },

  doSendRequestSearchUser: (user) => ({
    dispatch,
    store,
    handleErrors
  }) => {

    // validation - don't request an empty query
    if (user && user.length !== 0) {
      const authAccessToken = store.selectAuthAccessToken()
      let requestParams = REQUESTS.SEARCH_USERS
      requestParams.query = {
        q: user, // query
        r: 5, // result limit
        p: 0, // page offset
      }
      store.selectBackend()
        .fetch(authAccessToken, requestParams)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            dispatch({
              type: USER_ACTION.UPDATE_USERS_LIST,
              payload: { usersList: Array.isArray(data) ? [...data] : [data] }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      store.doUser_clearSelectedUser()
      dispatch({
        type: USER_ACTION.UPDATE_USERS_LIST,
        payload: { usersList: [] }
      })
    }
  },

  doSendRequestGetSurveyMembers: surveyId => ({
    dispatch,
    store,
    handleErrors
  }) => {

    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.GET_SURVEY_MEMBERS
    requestParams.pathParam = "/" + surveyId

    if (surveyId === undefined) {
      throw new Error('Unable to read surveyId when trying to getSurveyMembers')
    }

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: USER_ACTION.UPDATE_SURVEY_MEMBERS,
          payload: {
            surveyMembers: Array.isArray(data) ? [...data] : [data],
            flagChangedUserList: false,
          }
        })
      })
      .catch((err) => {
        console.log(err)
      });
  },

  doUser_sendRequestAddSurveyor: (surveyId, userId) => ({
    dispatch,
    store,
    handleErrors
  }) => {
    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.UPSERT_SURVEY_MEMBER
    requestParams.pathParam = "/" + surveyId
    requestParams.body = {
      surveyId: surveyId,
      userId: userId,
      isOwner: false,
    }

    if (surveyId === undefined) {
      throw new Error('Unable to read surveyId when trying to addSurveyor')
    }

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(_ => {
        dispatch({
          type: USER_ACTION.UPDATE_SURVEY_MEMBERS,
          payload: { flagChangedUserList: true }
        })
      })
      .then(_ => {
        dispatch({
          type: USER_ACTION.UPDATE_SELECTED_USER,
          payload: { selectedUser: null }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  doUser_sendRequestRemoveUser: (surveyId, memberId) => ({ dispatch, store, handleErrors }) => {

    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.REMOVE_MEMBER_FROM_SURVEY
    requestParams.pathParam = "/" + surveyId
    requestParams.pathParam2 = "/" + memberId

    if (surveyId === undefined) {
      throw new Error('Unable to read surveyId when trying to removeUser')
    }
    if (memberId === undefined) {
      throw new Error('Unable to read memberId when trying to removeUser')
    }

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(_ => {
        dispatch({
          type: USER_ACTION.UPDATE_SURVEY_MEMBERS,
          payload: { flagChangedUserList: true }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  reactRefreshUserListOnAddedMember: createSelector(
    'selectSurvey_selectedSurvey',
    'selectUser_flagChangedUserList',
    (survey_selectedSurvey, user_flagChangeUserList) => {
      if (user_flagChangeUserList && survey_selectedSurvey) {
        return {
          actionCreator: 'doSendRequestGetSurveyMembers',
          args: [survey_selectedSurvey.id],
        }
      }
    }
  ),

  selectUsersList: state => state.user.usersList,

  selectUserSurveyMembers: state => state.user.surveyMembers,

  selectUser_selectedUser: state => state.user.selectedUser,

  selectUser_flagChangedUserList: state => state.user.flagChangedUserList,
}
