import { createSelector } from "redux-bundler"
import CSVMetaArrayUtils from "../lib/data/CSVMetaArrayUtils"
import CREATE_SURVEY_STEP from "../stores/newSurveyStep"
import REQUESTS from "../stores/requestParams"

const ELEMENT_ACTION = {
  STORE_ELEMENTS: "ELEMENT_ACTION.STORE_ELEMENTS",
  STORE_PROCESSED_ELEMENTS: "ELEMENT_ACTION.STORE_PROCESSED_ELEMENTS",
  ELEMENTS_RETRIEVED: "ELEMENT_ACTION.RETRIEVED_ELEMENTS",
  FLAG_PROCESS_RAW_DATA: "ELEMENT_ACTION.FLAG_PROCESS_RAW_DATA",
}

export default {
  name: 'element',

  getReducer: () => {
    const initialData = {
      elements: [],
      backend: null,
      flagShouldProcessRawData: false,
      // processedElements should be a json array
      processedElements: null,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case ELEMENT_ACTION.STORE_ELEMENTS:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doElement_storeElements: elements => ({ dispatch }) => {
    dispatch({
      type: ELEMENT_ACTION.STORE_ELEMENTS,
      payload: {
        elements: elements,
      }
    })
    dispatch({
      type: ELEMENT_ACTION.FLAG_PROCESS_RAW_DATA,
      payload: {
        flagShouldProcessRawData: true
      }
    })
  },

  // doElement_sendRequestInsertElements sends a list of elements to the api and update
  // the survey status to active, postFetchCallback enables async follow-up on request ending
  doElement_sendRequestInsertElements: postFetchCallback => ({ store, handleErrors }) => {

    const requestParams = REQUESTS.INSERT_SURVEY_ELEMENTS
    // authAccessToken is always refreshing, it has to be updated from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()
    const survey_selected = store.selectSurvey_selectedSurvey()
    requestParams.pathParam = "/" + survey_selected.id

    if (store.selectSurvey_selectedSurvey() === undefined) {
      throw new Error('Unable to read createSurveyId when trying to sendElements')
    }

    let elements = store.selectElement_processedElements()
    // only send request if there is data
    if (elements) {
      let body = elements
      requestParams.body = body

      // send request, process response, update display step
      store.selectBackend()
        .fetch(authAccessToken, requestParams)
        .then(handleErrors)
        .then(postFetchCallback)
        .then(_ => {
          store.doSurvey_sendRequestUpdateSurvey({ ...survey_selected, active: true })
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },

  // Each element is an obj with fdId, isControl, surveyOrder
  doElement_sendRequestGetElements: survey => ({ dispatch, store, handleErrors }) => {
    const surveyId = survey.id
    // validation - don't request an empty query
    const authAccessToken = store.selectAuthAccessToken()
    let requestParams = REQUESTS.GET_ELEMENTS
    requestParams.pathParam = "/" + surveyId
    store.selectBackend()
      .fetch(authAccessToken, requestParams)
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        if (data != null) {
          dispatch({
            type: ELEMENT_ACTION.ELEMENTS_RETRIEVED,
            payload: { elements: Array.isArray(data) ? [...data] : [data] }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  // process elements on load
  reactChangeElementProperties: createSelector(
    'selectFlagShouldProcessRawData',
    'selectElement_elements',
    (flag, rawElements) => {
      const newNames = ['fdId', 'isControl']

      // removed file from dropzone
      if (flag && rawElements && rawElements.values.length == 0) {
        return {
          type: ELEMENT_ACTION.STORE_ELEMENTS,
          payload: {
            elements: [],
            processedElements: null,
            flagShouldProcessRawData: false
          }
        }
      }

      if (flag) {
        const dataPipeline = new CSVMetaArrayUtils(rawElements)
        dataPipeline
          .changeProperty(newNames)
          // convert cols from string to numeric and boolean
          .mapRow(row => [Number(row[0]), row[1] === '1' ? true : false])
          .addIndex(1)
          .changePropertyByName('index', 'surveyOrder')
          .addCol('surveyId', store.selectSurvey_selectedSurvey().id)
        return {
          type: ELEMENT_ACTION.STORE_PROCESSED_ELEMENTS,
          payload: {
            processedElements: dataPipeline.jsonArray(),
            flagShouldProcessRawData: false
          }
        }
      }
    }
  ),

  doElement_storeProcessedElements: elements => ({ dispatch }) => {
    dispatch({
      type: ELEMENT_ACTION.STORE_PROCESSED_ELEMENTS,
      payload: {
        processedElements: elements,
        flagShouldProcessRawData: false,
      }
    })
  },

  doElement_shouldProcessRawData: _ => ({ dispatch }) => {
    dispatch({
      type: ELEMENT_ACTION.FLAG_PROCESS_RAW_DATA,
      payload: {
        flagShouldProcessRawData: true,
      },
    })
  },

  // reactProcessRawData: createSelector(
  //   "selectFlagShouldProcessRawData",
  //   "selectElement_elements",
  //   (flag, elements) => {
  //     if (flag && elements) {
  //       // only process if there is data
  //       const dataPipeline = new CSVMetaArrayUtils(elements)
  //       dataPipeline
  //         .addIndex(1)
  //         .changePropertyByName('index', 'surveyOrder')
  //         .addCol('surveyId', store.selectSurvey_selectedSurvey().id)
  //       return {
  //         actionCreator: "doElement_storeProcessedElements",
  //         args: [dataPipeline.jsonArray()],
  //       }
  //     }
  //   }
  // ),

  selectElement_elements: state => state.element.elements,
  selectElement_processedElements: state => state.element.processedElements,
  selectFlagChangeProperties: state => state.createNewSurvey.flagChangeSurveyElementsProperties,
  selectFlagShouldProcessRawData: state => state.element.flagShouldProcessRawData,
}
