import httpStatus from "./httpStatus"

const END_POINT = {
  VERSION: "/version",
  SURVEY: "/survey",
  SURVEYS: "/surveys",
  SURVEY_MEMBER: "/survey/member",
  SURVEY_ASSIGNMENT: "/survey/assignment",
  USER_SEARCH: "/users/search",
  SURVEY_ID_ARG: null,
}

const METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
}

// e.GET(urlPrefix+"/version", surveyHandler.Version)
// e.GET(urlPrefix+"/surveys", auth.AuthorizeRoute(surveyHandler.GetSurveysForUser, PUBLIC))
// e.POST(urlPrefix+"/survey", auth.AuthorizeRoute(surveyHandler.CreateNewSurvey, ADMIN))

// e.PUT(urlPrefix+"/survey/:surveyid", auth.AuthorizeRoute(surveyHandler.UPDATESURVEY, ADMIN, SURVEY_OWNER))
// e.GET(urlPrefix+"/survey/:surveyid/members", auth.AuthorizeRoute(surveyHandler.GETSURVEYMEMBERS, ADMIN, SURVEY_OWNER))
// e.POST(urlPrefix+"/survey/:surveyid/member", auth.AuthorizeRoute(surveyHandler.UPSERTSURVEYMEMBER, ADMIN, SURVEY_OWNER))
// e.DELETE(urlPrefix+"/survey/member/:memberid", auth.AuthorizeRoute(surveyHandler.REMOVESURVEYMEMBER, ADMIN, SURVEY_OWNER))
// e.POST(urlPrefix+"/survey/:surveyid/elements", auth.AuthorizeRoute(surveyHandler.INSERTSURVEYELEMENTS, ADMIN, SURVEY_OWNER))
// e.POST(urlPrefix+"/survey/:surveyid/assignments", auth.AuthorizeRoute(surveyHandler.ADDASSIGNMENTS, ADMIN))
// e.GET(urlPrefix+"/survey/:surveyid/assignment", auth.AuthorizeRoute(surveyHandler.ASSIGNSURVEYELEMENT, SURVEY_MEMBER))
// e.POST(urlPrefix+"/survey/assignment", auth.AuthorizeRoute(surveyHandler.SAVESURVEYASSIGNMENT, SURVEY_MEMBER))
// e.GET(urlPrefix+"/users/search", auth.AuthorizeRoute(surveyHandler.SEARCHUSERS, PUBLIC))
// e.GET(urlPrefix+"/survey/:surveyid/report", auth.AuthorizeRoute(surveyHandler.GETSURVEYREPORT, ADMIN, SURVEY_OWNER))

export default {

  VERSION: {
    endpoint: END_POINT.VERSION,
    method: METHOD.GET,
    expectedResponse: httpStatus.StatusCreated,
  },

  GET_SURVEY_FOR_USER: {
    endpoint: END_POINT.SURVEYS,
    method: METHOD.GET,
  },

  CREATE_NEW_SURVEY: {
    endpoint: END_POINT.SURVEY,
    method: METHOD.POST,
    body: null,
    expectedResponseStatus: httpStatus.StatusCreated,
  },


  UPDATE_SURVEY: {

  },

  GET_SURVEY_MEMBERS: {

  },

  UPSERT_SURVEY_MEMBER: {

  },

  REMOVE_SURVEY_MEMBER: {

  },

  INSERT_SURVEY_ELEMENTS: {
    endpoint: END_POINT.SURVEY,
    method: METHOD.POST,
    body: null,
    expectedResponseStatus: httpStatus.StatusCreated,
  },

  ADD_ASSIGNMENTS: {

  },

  ASSIGN_SURVEY_ELEMENT: {

  },

  SAVE_SURVEY_ASSIGNMENT: {

  },

  SEARCH_USERS: {

  },

  GET_SURVEY_REPORT: {

  },

}