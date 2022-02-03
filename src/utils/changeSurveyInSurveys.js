// Query surveys array and replace survey with matched id
const changeSurveyInSurveys = (surveys, survey) => {
  let ws = [...surveys]
  surveys.forEach((idx, s) => {
    if (s.id == survey.id) {
      ws[idx] = survey
    }
  })
  return ws
}

export default changeSurveyInSurveys
