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

  /**
  * @param backend a SurveyApi object providing connection to backend db
  * @param requestParams object providing params to construct request
  */
  doSendRequestCreateSurvey: (requestParams) => ({
    dispatch,
    store,
    handleErrors
  }) => {

    // only send request if the survey name is valid
    if (store.selectSurvey_flagValidSurveyName()) {

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
              active: true,
            }
            store.doSurvey_updateSelectedSurvey(createdSurvey)
          }
        })
        .then(_ => {
          dispatch({
            type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
            payload: {
              surveyStep: CREATE_SURVEY_STEP.POINTS,
              flagValidSurveyName: true, // reset survey name validate flag to true
            }
          })
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },

  doCreateNew_createSurveyStep: step => ({ dispatch }) => {
    dispatch({
      type: CREATE_NEW_SURVEY_ACTION.STORE_STEP,
      payload: { 'surveyStep': step }
    })
  },

  selectCreateSurveyStep: state => state.createNewSurvey.surveyStep,
  selectCreateSurveyId: state => state.createNewSurvey.surveyId,
}
