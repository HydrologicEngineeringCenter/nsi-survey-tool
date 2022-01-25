const MANAGE_SURVEY_ACTION = {
  MUTATE_STORE: "MANAGE_SURVEY_ACTION.MUTATE_STORE"
}

export default {
  name: "manageSurvey",

  getReducer: () => {
    const initialData = {
      shouldInitControlPromptArray: false,
      showControlPrompt: {}, // map determining whether control prompt should be collapsed for each survey
      controlSurvey: null,
      flagChangedUserList: false,
    }
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case MANAGE_SURVEY_ACTION.MUTATE_STORE:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  doManageSurvey_dispatchShouldInitControlPromptArray: _ => ({ dispatch }) => {
    dispatch({
      type: MANAGE_SURVEY_ACTION.MUTATE_STORE,
      payload: {
        shouldInitControlPromptArray: true,
      }
    })
  },

  // init showControlPrompt array with dynamic sizing based on number of surveys
  doManageSurvey_initShowControlPromptArray: _ => ({ dispatch, store }) => {
    let controlPromptMap = {}
    store.selectSurvey_surveys().forEach(survey => {
      controlPromptMap[survey.id] = false
    })
    dispatch({
      type: MANAGE_SURVEY_ACTION.MUTATE_STORE,
      payload: {
        // showControlPrompt: new Array(store.selectSurvey_surveys().length).fill(false),
        showControlPrompt: controlPromptMap,
        shouldInitControlPromptArray: false,
      }
    })
  },

  // Change control prompt from show to hide for a single survey and vice versa
  doManageSurvey_flipControlPromptDisplay: id => ({ dispatch, store }) => {
    let controlPromptMap = store.selectManageSurvey_showControlPrompt()
    controlPromptMap[id] = !controlPromptMap[id]
    dispatch({
      type: MANAGE_SURVEY_ACTION.MUTATE_STORE,
      payload: {
        showControlPrompt: controlPromptMap,
      }
    })
  },

  // store current uncollapsed survey
  doManageSurvey_controlPrompt: survey => ({ dispatch, store }) => {
    if (survey != null) {
      store.doSurvey_updateSelectedSurvey(survey)
      store.doSendRequestGetSurveyMembers(survey.id)
    }
  },

  doManageSurvey_flipActive: _ => ({ dispatch, store }) => {
    let workingSurvey = { ...store.selectManageSurvey_controlSurvey() }
    workingSurvey["active"] = !workingSurvey["active"]
    // send request to backend and mutate list in survey bundle
    store.doSurvey_sendRequestUpdateSurvey(workingSurvey)
    // mutate selection in manageSurvey bundle
    dispatch({
      type: MANAGE_SURVEY_ACTION.MUTATE_STORE,
      payload: {
        controlSurvey: workingSurvey,
      }
    })
  },

  // reactor to init control prompt array
  reactInitShowControlPromptArray: state => {
    if (state.manageSurvey.shouldInitControlPromptArray) return { actionCreator: 'doManageSurvey_initShowControlPromptArray' }
  },

  selectManageSurvey_showControlPrompt: state => state.manageSurvey.showControlPrompt,
  selectManageSurvey_controlSurvey: state => state.manageSurvey.controlSurvey,
  selectManageSurvey_flagChangedUserList: state => state.manageSurvey.flagChangedUserList,
}
