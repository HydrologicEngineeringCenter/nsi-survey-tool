
const CREATE_NEW_SURVEY = "CREATE_NEW_SURVEY";
const ADD_SURVEY_POINTS = "ADD_SURVEY_POINTS";
const ADD_SURVEYORS = "ADD_SURVEYORS";

const CREATE_NEW_SURVEY_ACTION = {
  STORE_SURVEY_NAME: "CREATE_NEW_SURVEY_ACTION.STORE_SURVEY_NAME",
  STORE_STEP: "CREATE_NEW_SURVEY_ACTION.STORE_STEP",
  STORE_NAME: "CREATE_NEW_SURVEY_ACTION.STORE_NAME",
  STORE_REQUEST_BODY_PARAM: "CREATE_NEW_SURVEY_ACTION.STORE_REQUEST_BODY_PARAM",
}

export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      // _flagInvalidName: false,
      flagSurveyActive: true,
      surveyStep: 0,
      surveyId: ""
      // enteredSurveyDescription: null,
      // enteredActiveSwitch: null,
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {

        case CREATE_NEW_SURVEY:
        case ADD_SURVEY_POINTS:
        case ADD_SURVEYORS:
        case CREATE_NEW_SURVEY_ACTION.STORE_STEP:
        case CREATE_NEW_SURVEY_ACTION.STORE_NAME:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  /**
   *
   * @param {object} payload
   */
  doStoreCreateSurveyName: surveyName => ({ dispatch, store }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_NAME,
      payload: {
        surveyName: surveyName
      }
    })
  },

  doStoreCreateSurveyStep: surveyStep => ({ dispatch, store }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
      payload: {
        surveyStep: surveyStep,
      }
    })
  },


  doStoreSurveyName: surveyName => ({ dispatch, store }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_SURVEY_NAME,
      payload: {
        surveyName: surveyName
      }
    })
  },

  /**
  * @param backend a SurveyApi object providing connection to backend db
  * @param requestParams object providing params to construct request
  * @param setSurveyId a set state function to store surveyId
  *   do actions can't be async
  */
  doSendRequestCreateSurvey: (backend, requestParams, setSurveyId) => ({ dispatch, store }) => {
    const authAccessToken = store.selectAuthAccessToken()
    // responseHandler operates on the raw response from the backend
    const responseHandler = async response => {
      if (response.status === requestParams.expectedResponseStatus) {
        const resolvedJson = await response.json()
        const resolvedId = resolvedJson.surveyId
        setSurveyId(resolvedId)
      } else {
        throw new UnexpectedResponseError(response)
      }
    }
    backend.send(authAccessToken, requestParams, responseHandler)
  },

  doSendRequestInsertElements: async (backend, requestParams) => ({ dispatch, store }) => {
    const authAccessToken = store.selectAuthAccessToken()
    const responseHandler = async response => {

    }
    backend.send(authAccessToken, requestParams, responseHandler)
  },
  // selectInvalidName: state => state.createNewSurvey._flagInvalidName,
  selectCreateSurveyName: state => state.createNewSurvey.surveyName,
  selectFlagSurveyActive: state => state.createNewSurvey.flagSurveyActive,
  selectCreateSurveyStep: state => {
    return state.createNewSurvey.surveyStep;
  },

};
