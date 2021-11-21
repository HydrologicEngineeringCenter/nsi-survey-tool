import { UnexpectedResponseError } from "../errors/exceptions";

const apiHost = process.env.REACT_APP_SURVEY_API;

// error handling inside the connection access object
const handleUnexpectedResponse = (response, expectedHttpStatus) => {
  if (expectedHttpStatus !== response.status) {
    throw new UnexpectedResponseError(response)
  } else {
    return response;
  }
}

/*
*   Cookie cutter REST request
*/
class SurveyApi {

  constructor() {
    this.apiHost = apiHost
  }

  /**
   * DEPRECATED - USE fetch() INSTEAD
   * Send an authenticated request
   * @param {string} token bearer token from auth server
   * @param {object} params object from the requestParams store
   * @param {Function} handleResponse
   */
  async send(token, requestParams, handleResponse) {
    // using fetch().then()... would put the resolve of promise into a micro
    // queue, bypassing tasks on the main thread. we want the response
    // promise to resolve before starting the next task.
    try {
      const response = await fetch(`${this.apiHost}${requestParams.endpoint}`, {
        method: requestParams.method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: requestParams.body ? JSON.stringify(requestParams.body) : "",
      })

      // response is already resolved  with the await above but the
      // reponse.json() body isn't - this is probably easier in typescript
      handleResponse(response)

    } catch (error) {
      console.log(error.toString())
    }
  }

  /**
  * Returns a prepopulated fetch promise
  */
  fetch(authAccessToken, requestParams) {
    let url = ''
    let query = ''

    // add in whole
    if (requestParams.pathParam) {
      url = `${apiHost}${requestParams.endpoint}${requestParams.pathParam}${requestParams.suffix}`
    } else {
      url = `${apiHost}${requestParams.endpoint}`
    }

    // add in query string
    if (requestParams.query) {
      query = new URLSearchParams(requestParams.query)
      url += ('?' + query.toString())
    }

    let requestObj = {
      method: requestParams.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authAccessToken}`,
      },
    }

    if (requestParams.body) requestObj.body = JSON.stringify(requestParams.body)

    return fetch(url, requestObj)
  }
}


export default SurveyApi;
