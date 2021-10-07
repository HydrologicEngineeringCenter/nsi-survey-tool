const END_POINT = {
  VERSION: "/version",
  SURVEY: "/survey",
  SURVEYS: "/surveys",
}

const METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
}


  // e.GET(urlPrefix+"/version", surveyHandler.Version)
	// e.GET(urlPrefix+"/surveys", auth.AuthorizeRoute(surveyHandler.GetSurveysForUser, PUBLIC))
	// e.POST(urlPrefix+"/survey", auth.AuthorizeRoute(surveyHandler.CreateNewSurvey, ADMIN))
	// e.PUT(urlPrefix+"/survey/:surveyid", auth.AuthorizeRoute(surveyHandler.UpdateSurvey, ADMIN, SURVEY_OWNER))
	// e.GET(urlPrefix+"/survey/:surveyid/members", auth.AuthorizeRoute(surveyHandler.GetSurveyMembers, ADMIN, SURVEY_OWNER))
	// e.POST(urlPrefix+"/survey/:surveyid/member", auth.AuthorizeRoute(surveyHandler.UpsertSurveyMember, ADMIN, SURVEY_OWNER))
	// e.DELETE(urlPrefix+"/survey/member/:memberid", auth.AuthorizeRoute(surveyHandler.RemoveSurveyMember, ADMIN, SURVEY_OWNER))
	// e.POST(urlPrefix+"/survey/:surveyid/elements", auth.AuthorizeRoute(surveyHandler.InsertSurveyElements, ADMIN, SURVEY_OWNER))
	// e.POST(urlPrefix+"/survey/:surveyid/assignments", auth.AuthorizeRoute(surveyHandler.AddAssignments, ADMIN))
	// e.GET(urlPrefix+"/survey/:surveyid/assignment", auth.AuthorizeRoute(surveyHandler.AssignSurveyElement, SURVEY_MEMBER))
	// e.POST(urlPrefix+"/survey/assignment", auth.AuthorizeRoute(surveyHandler.SaveSurveyAssignment, SURVEY_MEMBER))
	// e.GET(urlPrefix+"/users/search", auth.AuthorizeRoute(surveyHandler.SearchUsers, PUBLIC))
	// e.GET(urlPrefix+"/survey/:surveyid/report", auth.AuthorizeRoute(surveyHandler.GetSurveyReport, ADMIN, SURVEY_OWNER))

export default {

  VERSION: {
    endpoint: END_POINT.VERSION,
    method: METHOD.GET,
  },

  GET_SURVEY_FOR_USER: {
    endpoint: END_POINT.SURVEYS,
    method: METHOD.GET,
  },

  CREATE_NEW_SURVEY: {
    endpoint: END_POINT.SURVEYS,
    method: METHOD.POST,
    body: null,
  },

  

}