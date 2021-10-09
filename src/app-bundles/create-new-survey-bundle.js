
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
      surveyName: "",
      flagSurveyActive: true,
      surveyStep: 0,
      surveyName: null,
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

  // doCreateNewSurvey: (surveyName) => ({ dispatch, store }) => {

  //   const token = store.selectAuthAccessToken();
  //   console.log(token)
  //   // const surveyName = store.selectSurveyName();
  //   const flagSurveyActive = store.selectFlagSurveyActive();

  //   if (token) {

  //   } else {
  //     console.log("Error: not logged in or missing token. Cannot create new survey");
  //   }

  //   dispatch({
  //     type: CREATE_NEW_SURVEY,
  //     payload: {
  //       surveyName: surveyName,
  //       activeStatus: flagSurveyActive
  //     }
  //   })
  // },

  // selectInvalidName: state => state.createNewSurvey._flagInvalidName,
  selectCreateSurveyName: state => state.createNewSurvey.surveyName,
  selectFlagSurveyActive: state => state.createNewSurvey.flagSurveyActive,
  selectCreateSurveyStep: state => {
    return state.createNewSurvey.surveyStep;
  },

};