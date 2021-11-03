import CREATE_SURVEY_STEP from "../stores/newSurveyStep";

const CREATE_NEW_SURVEY_ACTION = {
  STORE_SURVEY_NAME: "CREATE_NEW_SURVEY_ACTION.STORE_SURVEY_NAME",
  STORE_STEP: "CREATE_NEW_SURVEY_ACTION.STORE_STEP",
  STORE_NAME: "CREATE_NEW_SURVEY_ACTION.STORE_NAME",
  STORE_REQUEST_BODY_PARAM: "CREATE_NEW_SURVEY_ACTION.STORE_REQUEST_BODY_PARAM",
  UPDATE_SURVEY_ID: "CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID",
}

export default {

  name: 'createNewSurvey',

  getReducer: () => {
    const initialData = {
      surveyStep: 0,
      surveyId: ""
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {

        case CREATE_NEW_SURVEY_ACTION.STORE_STEP:
        case CREATE_NEW_SURVEY_ACTION.STORE_NAME:
        case CREATE_NEW_SURVEY_ACTION.UPDATE_SURVEY_ID:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
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

  doSendRequestInsertElements: async (backend, requestParams) => ({ dispatch, store }) => {
    const authAccessToken = store.selectAuthAccessToken()
    backend.send(authAccessToken, requestParams, responseHandler)
  },

  selectCreateSurveyStep: state => {
    return state.createNewSurvey.surveyStep;
  },
  selectCreateSurveyId: state => state.createNewSurvey.surveyId,

};
