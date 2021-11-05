import { createSelector } from "redux-bundler"
import CSVMetaArrayProcessor from '../lib/data/CSVMetaArrayProcessor'
import CREATE_SURVEY_STEP from "../stores/newSurveyStep"

const CREATE_NEW_SURVEY_ACTION = {
  STORE_STEP: "CREATE_NEW_SURVEY_ACTION.STORE_STEP",
  UPDATE_SURVEY_ID: "CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID",
  STORE_ELEMENTS: "CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS",
}

export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      surveyStep: 0,
      surveyId: "",
      surveyElements: null,
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case CREATE_NEW_SURVEY_ACTION.STORE_STEP:
        case CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID:
        case CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doStoreCreateSurveyStep: surveyStep => ({ dispatch }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
      payload: {
        surveyStep: surveyStep,
      }
    })
  },

  doStoreCreateSurveyElements: surveyElements => ({ dispatch }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS,
      payload: {
        surveyElements: surveyElements,
      }
    })
  },

  /**
  * @param backend a SurveyApi object providing connection to backend db
  * @param requestParams object providing params to construct request
  */
  doSendRequestCreateSurvey: (backend, requestParams) => ({
    dispatch,
    store,
    handleErrors
  }) => {

    // authAccessToken is always refreshing, have to update from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()

    // send request, process response, update display step
    backend
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        if (data != null) {
          dispatch({
            type: CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID,
            payload: { 'surveyId': { ...data } } // store surveyId within bundler
          })
        }
      })
      .then(_ => {
        dispatch({
          type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
          payload: { 'surveyStep': CREATE_SURVEY_STEP.POINTS }
        })
      })
      .catch((err) => {
        console.log(err)
      });
  },

  // react to change in survey elements data
  reactChangeElementProperties: createSelector(
    'selectCreateSurveyElements',
    createSurveyElements => {
      const newNames = ['fdId', 'isControl']
      if (createSurveyElements) {
        const processor = new CSVMetaArrayProcessor(createSurveyElements)
        newNames.forEach((newName, idx) => {
          if (newName != createSurveyElements.properties[idx]) {
            processor.changePropertyByIndex(
              idx,
              newName
            )
          }
        })
      }
    }
  ),

  doSendRequestInsertElements: (backend, requestParams) => ({
    dispatch,
    store,
    handleErrors
  }) => {
    // authAccessToken is always refreshing, have to update from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()

    // send request, process response, update display step
    backend
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(_ => {
        dispatch({
          type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
          payload: { 'surveyStep': CREATE_SURVEY_STEP.SURVEYORS }
        })
      })
      .catch((err) => {
        console.log(err)
      });
  },

  selectCreateSurveyStep: state => state.createNewSurvey.surveyStep,

  selectCreateSurveyId: state => state.createNewSurvey.surveyId,

  selectCreateSurveyElements: state => state.createNewSurvey.surveyElements,
};
