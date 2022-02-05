import { createSelector } from "redux-bundler"
import REQUESTS from "../stores/requestParams"
import HTTP_STATUS from "../stores/httpStatus"

const SURVEY_ACTION = {
  GET_SURVEYS_FOR_USER: "SURVEY_ACTION.GET_SURVEYS_FOR_USER",
  UPDATE_SURVEYS: "SURVEY_ACTION.UPDATE_SURVEYS",
  OPEN_MANAGE_SURVEY: "SURVEY_ACTION.OPEN_MANAGE_SURVEY",
  UPDATE_SELECTED_SURVEY: "SURVEY_ACTION.UPDATE_SELECTED_SURVEY",
  UPDATE_FLAG_VALID_NAME: "SURVEY_ACTION.UPDATE_FLAG_VALID_NAME",
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
      flagUpdateSelected: false,
      flagValidName: false,
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
          // update selectedSurvey
          if (store.selectSurvey_selectedSurvey().id == payload.id) {
            dispatch({
              type: SURVEY_ACTION.UPDATE_SELECTED_SURVEY,
              payload: {
                flagUpdateSelected: true,
              },
            })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  doSurvey_openManageSurvey: _ => ({ dispatch }) => {
    dispatch({
      type: SURVEY_ACTION.OPEN_MANAGE_SURVEY,
      payload: {
        showManagesurvey: true
      },
    })
  },

  doSurvey_downloadReport: _ => ({ store }) => {
    const authAccessToken = store.selectAuthAccessToken()
    const survey = store.selectSurvey_selectedSurvey()
    let requestParams = REQUESTS.GET_SURVEY_REPORT
    requestParams.pathParam = "/" + survey.id

    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(res => res.blob())
      .then(data => {
        var a = document.createElement("a")
        a.href = window.URL.createObjectURL(data)
        a.download = "surveys.csv"
        a.click()
      })
      .catch((err) => {
        console.log(err)
      })
  },

  doSurvey_updateSurveys: surveys => ({ dispatch }) => {
    dispatch({
      type: SURVEY_ACTION.UPDATE_SURVEYS,
      payload: {
        surveys: surveys,
      }
    })
  },

  doSurvey_updateSelectedFromSurveys: _ => ({ dispatch }) => {
    let workingSurveys = store.selectSurvey_surveys()
    let selected = store.selectSurvey_selectedSurvey()
    selected = workingSurveys.filter(s => s.id == selected.id)[0]
    store.doSurvey_updateSelectedSurvey(selected)
    dispatch({
      type: SURVEY_ACTION.UPDATE_SURVEYS,
      payload: {
        flagUpdateSelected: false,
      },
    })
  },

  doSurvey_sendRequestValidateSurveyName: surveyName => ({ dispatch, store, handleErrors }) => {
    if (surveyName && surveyName.length !== 0) {
      const authAccessToken = store.selectAuthAccessToken()
      let requestParams = REQUESTS.VALIDATE_SURVEY_NAME
      requestParams.query = {
        q: surveyName, // query
      }
      store.selectBackend()
        .fetch(authAccessToken, requestParams)
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            dispatch({
              type: SURVEY_ACTION.UPDATE_FLAG_VALID_NAME,
              payload: { flagValidName: data["result"] }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  // reactUpdateSelected update selectedSurvey on changes to any of its properties
  reactUpdateSelected: createSelector(
    "selectSurvey_flagUpdateSelected",
    "selectSurvey_selectedSurvey",
    "selectSurvey_surveys",
    (flag, selected, surveys) => {
      if (flag) {
        // test if current selected id exists in survey list
        if (surveys.filter(s => s.id == selected.id).length > 0) { // in manage-all
          return {
            actionCreator: "doSurvey_updateSelectedFromSurveys",
            args: [selected],
          }
        } else { // in create-new after inserting elements
          return {
            actionCreator: "doSurvey_updateSelectedSurvey",
            args: [{ ...selected, active: true }],
          }
        }
      }
    }
  ),

  // surveys is an Array of maps. Each map contains 4 fields: active, description, id, and title
  selectSurvey_surveys: state => state.survey.surveys,
  selectSurvey_showManageSurvey: state => state.survey.showManagesurvey,
  selectSurvey_selectedSurvey: state => state.survey.selectedSurvey,
  selectSurvey_flagUpdateSelected: state => state.survey.flagUpdateSelected,
  selectSurvey_flagValidSurveyName: state => state.survey.flagValidName,
}
