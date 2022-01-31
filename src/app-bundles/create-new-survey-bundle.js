import { createSelector } from "redux-bundler"
import CSVMetaArrayUtils from "../lib/data/CSVMetaArrayUtils"
import CREATE_SURVEY_STEP from "../stores/newSurveyStep"

const CREATE_NEW_SURVEY_ACTION = {
  STORE_STEP: "CREATE_NEW_SURVEY_ACTION.STORE_STEP",
  UPDATE_SURVEY_ID: "CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID",
  STORE_ELEMENTS: "CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS",
  FLAG_CHANGE_PROPERTIES: "CREATE_NEW_SURVEY_ACTION.FLAG_CHANGE_PROPERTIES",
  STORE_BACKEND: "CREATE_NEW_SURVEY_ACTION.STORE_BACKEND",
  UPDATE_USERS_LIST: "CREATE_NEW_SURVEY_ACTION.UPDATE_USERS_LIST",
  CLEAR_SELECTED_USER: "CREATE_NEW_SURVEY_ACTION.CLEAR_SELECTED_USER",
}

export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      surveyStep: 0,
      surveyElements: null,
      flagChangeSurveyElementsProperties: false,
      backend: null,
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case CREATE_NEW_SURVEY_ACTION.STORE_STEP:
        case CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID:
        case CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS:
        case CREATE_NEW_SURVEY_ACTION.FLAG_CHANGE_PROPERTIES:
        case CREATE_NEW_SURVEY_ACTION.STORE_BACKEND:
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
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.FLAG_CHANGE_PROPERTIES,
      payload: {
        flagChangeSurveyElementsProperties: true
      }
    })
  },

  /**
  * @param backend a SurveyApi object providing connection to backend db
  * @param requestParams object providing params to construct request
  */
  doSendRequestCreateSurvey: (requestParams) => ({
    dispatch,
    store,
    handleErrors
  }) => {

    // authAccessToken is always refreshing, have to update from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()

    // send request, process response, update display step
    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        // update based on for valid response
        if (data != null) {
          const createdSurvey = {
            id: data.surveyId,
            title: requestParams.title,
            description: requestParams.description,
            active: requestParams.active,
          }
          store.doSurvey_updateSelectedSurvey(createdSurvey)
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

  // process elements on load
  reactChangeElementProperties: createSelector(
    'selectCreateSurveyElements',
    'selectFlagChangeProperties',
    (createSurveyElements, flagChangeProperties) => {
      const newNames = ['fdId', 'isControl']
      if (flagChangeProperties) {
        const dataPipeline = new CSVMetaArrayUtils(createSurveyElements)
        dataPipeline
          .changeProperty(newNames)
          // convert cols from string to numeric and boolean
          .mapRow(row => [Number(row[0]), row[1] === '1' ? true : false])
        return {
          type: CREATE_NEW_SURVEY_ACTION.STORE_ELEMENTS,
          payload: {
            surveyElements: dataPipeline.data(),
            flagChangeSurveyElementsProperties: false
          }
        }
      }
    }
  ),

  doSendRequestInsertElements: (requestParams) => ({
    dispatch,
    store,
    handleErrors
  }) => {
    // authAccessToken is always refreshing, have to update from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()
    requestParams.pathParam = "/" + store.selectSurvey_selectedSurvey().id

    if (store.selectSurvey_selectedSurvey() === undefined) {
      throw new Error('Unable to read createSurveyId when trying to sendElements')
    }

    const dataPipeline = new CSVMetaArrayUtils(store.selectCreateSurveyElements())
    dataPipeline
      .addIndex(1)
      .changePropertyByName('index', 'surveyOrder')
      .addCol('surveyId', store.selectSurvey_selectedSurvey().id)

    let body = dataPipeline.jsonArray()
    requestParams.body = body

    // send request, process response, update display step
    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(_ => {
        dispatch({
          type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
          payload: { 'surveyStep': CREATE_SURVEY_STEP.SURVEYORS }
        })
      })
      .then(_ => {
        store.doUser_shouldUpdateSurveyMembers()
      })
      .catch((err) => {
        console.log(err)
      });
  },

  selectFlagChangeProperties: state => state.createNewSurvey.flagChangeSurveyElementsProperties,

  selectCreateSurveyStep: state => state.createNewSurvey.surveyStep,

  selectCreateSurveyId: state => state.createNewSurvey.surveyId,

  selectCreateSurveyElements: state => state.createNewSurvey.surveyElements,

};
