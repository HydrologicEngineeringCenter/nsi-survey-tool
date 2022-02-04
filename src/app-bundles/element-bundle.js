import { createSelector } from "redux-bundler"
import CSVMetaArrayUtils from "../lib/data/CSVMetaArrayUtils"
import CREATE_SURVEY_STEP from "../stores/newSurveyStep"
import REQUESTS from "../stores/requestParams"

const ELEMENT_ACTION = {
  STORE_ELEMENTS: "ELEMENT_ACTION.STORE_ELEMENTS",
  ELEMENTS_RETRIEVED: "ELEMENT_ACTION.RETRIEVED_ELEMENTS",
  FLAG_CHANGE_PROPERTIES: "ELEMENT_ACTION.FLAG_CHANGE_PROPERTIES",
}

export default {
  name: 'element',

  getReducer: () => {
    const initialData = {
      elements: [],
      flagChangeSurveyElementsProperties: false,
      backend: null,
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
      type: ELEMENT_ACTION.FLAG_CHANGE_PROPERTIES,
      payload: {
        flagChangeSurveyElementsProperties: true
      }
    })
  },

  doElement_insertElements: _ => ({ dispatch, store, handleErrors }) => {

    const requestParams = REQUESTS.INSERT_SURVEY_ELEMENTS
    // authAccessToken is always refreshing, it has to be updated from auth bundle
    // before sending request everytime
    const authAccessToken = store.selectAuthAccessToken()
    requestParams.pathParam = "/" + store.selectSurvey_selectedSurvey().id

    if (store.selectSurvey_selectedSurvey() === undefined) {
      throw new Error('Unable to read createSurveyId when trying to sendElements')
    }

    const elements = store.selectElement_elements()
    // only send request if there is data
    if (elements && elements.values.length > 0) {
      const dataPipeline = new CSVMetaArrayUtils(elements)
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
    'selectElement_elements',
    'selectFlagChangeProperties',
    (elements, flagChangeProperties) => {
      const newNames = ['fdId', 'isControl']

      // removed file from dropzone
      if (flagChangeProperties && elements.length == 0) {
        return {
          type: ELEMENT_ACTION.STORE_ELEMENTS,
          payload: {
            elements: [],
            flagChangeSurveyElementsProperties: false
          }
        }
      }

      if (flagChangeProperties) {
        const dataPipeline = new CSVMetaArrayUtils(elements)
        dataPipeline
          .changeProperty(newNames)
          // convert cols from string to numeric and boolean
          .mapRow(row => [Number(row[0]), row[1] === '1' ? true : false])
        return {
          type: ELEMENT_ACTION.STORE_ELEMENTS,
          payload: {
            elements: dataPipeline.data(),
            flagChangeSurveyElementsProperties: false
          }
        }
      }
    }
  ),


  selectElement_elements: state => state.element.elements,
  selectFlagChangeProperties: state => state.createNewSurvey.flagChangeSurveyElementsProperties,
}
