import REQUESTS from "../stores/requestParams"
import HTTP_STATUS from "../stores/httpStatus"

const SURVEY_ACTION = {
  GET_SURVEYS_FOR_USER: "SURVEY_ACTION.GET_SURVEYS_FOR_USER",
  UPDATE_SURVEYS: "SURVEY_ACTION.UPDATE_SURVEYS",
  OPEN_MANAGE_SURVEY: "SURVEY_ACTION.OPEN_MANAGE_SURVEY",
  UPDATE_SELECTED_SURVEY: "SURVEY_ACTION.UPDATE_SELECTED_SURVEY",
}

export default {

  name: 'survey',

  getReducer: () => {
    const initialData = {
      surveys: [],
      showManagesurvey: false,
      // selectedSurvey is populated after create-new-survey step 1
      // or on specific survey selection in manage-all-surveys
      selectedSurvey: null,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case SURVEY_ACTION.UPDATE_SURVEYS:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doSurvey_updateSelectedSurvey: survey => ({ dispatch }) => {
    dispatch({
      type: SURVEY_ACTION.UPDATE_SELECTED_SURVEY,
      payload: {
        selectedSurvey: survey,
      }
    })
  },

  // doSurvey_sendRequestGetSurveys requests list of all surveys for users from backend
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

  // payload is a mutated survey map containing 4 fields: id, title, description, active
  doSurvey_sendRequestUpdateSurvey: payload => ({ dispatch, store }) => {

    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.UPDATE_SURVEY
    requestParams.pathParam = "/" + payload.id
    requestParams.body = payload

    let workingSurveys = [...store.selectSurvey_surveys()]
    const idx = workingSurveys.findIndex(s => s.id == payload.id)
    workingSurveys[idx] = payload

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(res => {
        // only update if response status is 200
        if (res.status == HTTP_STATUS.StatusOK) {
          dispatch({
            type: SURVEY_ACTION.UPDATE_SURVEYS,
            payload: {
              surveys: workingSurveys,
            }
          })
        }
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
  selectSurvey_selectedSurvey: state => state.survey.selectedSurvey,
}
