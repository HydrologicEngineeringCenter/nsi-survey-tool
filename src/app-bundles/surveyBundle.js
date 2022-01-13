import REQUESTS from "../stores/requestParams"

const SURVEY_ACTION = {
  GET_SURVEYS_FOR_USER: "SURVEY_ACTION.GET_SURVEYS_FOR_USER",
  UPDATE_SURVEYS: "SURVEY_ACTION.UPDATE_SURVEYS",
  OPEN_MANAGE_SURVEY: "SURVEY_ACTION.OPEN_MANAGE_SURVEY",
}

export default {

  name: 'survey',

  getReducer: () => {
    const initialData = {
      surveys: [],
      showManagesurvey: false,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case SURVEY_ACTION.UPDATE_SURVEYS:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  // Request list of survey for users from backend
  doSurvey_sendRequestGetSurveys: _ => ({ dispatch, store, handleErrors }) => {

    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.GET_SURVEY_FOR_USER

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: SURVEY_ACTION.UPDATE_SURVEYS,
          payload: {
            surveys: Array.isArray(data) ? [...data] : [data],
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  doSurvey_sendRequestUpdateSurvey: _ => ({ }) => {

    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.UPDATE_SURVEY
    requestParams.pathParam = "/" + surveyId

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: SURVEY_ACTION.UPDATE_SURVEYS,
          payload: {
            surveys: Array.isArray(data) ? [...data] : [data],
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },

  doSurvey_loadSurveyTray: _ => ({ }) => {

  },

  doSurvey_openManageSurvey: _ => ({ dispatch }) => {
    dispatch({
      type: SURVEY_ACTION.OPEN_MANAGE_SURVEY,
      payload: {
        showManagesurvey: true
      },
    })
  },

  // surveys is an Array of maps. Each map contains 4 fields: active, description, id, and title
  selectSurvey_surveys: state => state.survey.surveys,

  selectSurvey_showManageSurvey: state => state.survey.showManagesurvey,
}
