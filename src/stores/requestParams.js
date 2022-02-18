import httpStatus from "./httpStatus"

const END_POINT = {
  VERSION: "/version",
  SURVEY: "/survey",
  SURVEYS: "/surveys",
  SURVEY_MEMBER: "/survey/member",
  SURVEY_ASSIGNMENT: "/survey/assignment",
  USER_SEARCH: "/users/search",
}

const SUFFIX = {
  ELEMENTS: "/elements",
  MEMBERS: "/members",
  MEMBER: "/member",
  REPORT: "/report",
  VALID: "/valid",
}

const METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PUT: "PUT",
}

// e.GET(urlPrefix+"/version", surveyHandler.Version)
// e.GET(urlPrefix+"/surveys", auth.AuthorizeRoute(surveyHandler.GetSurveysForUser, PUBLIC))
// e.POST(urlPrefix+"/survey", auth.AuthorizeRoute(surveyHandler.CreateNewSurvey, ADMIN))

// e.PUT(urlPrefix+"/survey/:surveyid", auth.AuthorizeRoute(surveyHandler.UPDATESURVEY, ADMIN, SURVEY_OWNER))
// e.GET(urlPrefix+"/survey/:surveyid/members", auth.AuthorizeRoute(surveyHandler.GETSURVEYMEMBERS, ADMIN, SURVEY_OWNER))
// e.POST(urlPrefix+"/survey/:surveyid/member", auth.AuthorizeRoute(surveyHandler.UPSERTSURVEYMEMBER, ADMIN, SURVEY_OWNER))
// e.DELETE(urlPrefix+"/survey/member/:memberid", auth.AuthorizeRoute(surveyHandler.REMOVESURVEYMEMBER, ADMIN, SURVEY_OWNER))
// e.DELETE(urlPrefix+"/survey/:surveyid/member/:memberid", auth.AuthorizeRoute(surveyHandler.RemoveMemberFromSurvey, ADMIN, SURVEY_OWNER))
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
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: "",
    method: METHOD.PUT,
    body: null,
  },

  GET_SURVEY_MEMBERS: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: SUFFIX.MEMBERS,
    method: METHOD.GET,
  },

  UPSERT_SURVEY_MEMBER: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: SUFFIX.MEMBER,
    method: METHOD.POST,
    body: null,
  },

  REMOVE_SURVEY_MEMBER: {

  },

  REMOVE_MEMBER_FROM_SURVEY: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    pathParam2: null,
    suffix: SUFFIX.MEMBER,
    method: METHOD.DELETE,
  },

  INSERT_SURVEY_ELEMENTS: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: SUFFIX.ELEMENTS,
    method: METHOD.POST,
    expectedResponseStatus: httpStatus.StatusCreated,
  },

  GET_ELEMENTS: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: SUFFIX.ELEMENTS,
    method: METHOD.GET,
    body: null,
  },

  ADD_ASSIGNMENTS: {

  },

  ASSIGN_SURVEY_ELEMENT: {

  },

  SAVE_SURVEY_ASSIGNMENT: {

  },

  SEARCH_USERS: {
    endpoint: END_POINT.USER_SEARCH,
    method: METHOD.GET,
    body: null,
    expectedResponseStatus: httpStatus.StatusOK,
  },

  GET_SURVEY_REPORT: {
    endpoint: END_POINT.SURVEY,
    pathParam: null,
    suffix: SUFFIX.REPORT,
    method: METHOD.GET,
  },

  VALIDATE_SURVEY_NAME: {
    endpoint: END_POINT.SURVEY,
    suffix: SUFFIX.VALID,
    method: METHOD.GET,
  },

}
