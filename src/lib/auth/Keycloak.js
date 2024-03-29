const urlencodeFormData = fd => new URLSearchParams([...fd])

class Keycloak {
  constructor(config) {
    this.accessToken = null;
    this.identityToken = null;
    this.config = config;
    this.authCallback = config.onAuthenticate;
    this.tokenCallback = config.onGetToken;
    this.errCallback = config.onError;
    this.sessionEndWarning = config.sessionEndWarning || 60;
    this.sessionEndingCallback = config.onSessionEnding;
    this.keycloakUrl = `${config.keycloakUrl}/realms/${config.realm}/protocol/openid-connect`
  }

  refreshInterval(expiresIn) {
    if (this.config.refreshInterval) {
      return this.config.refreshInterval * 1000;
    } else {
      const interval = (expiresIn - 60) * 1000;
      if (interval <= 0) {
        console.log(`Warning: Invalid Refresh Interval of ${interval} computed for token that expires in ${expiresIn}`);
        return 900 * 1000; //use default of 15 minutes
      }
      return interval;
    }
  }

  /**
   *  Send request to /auth endpoint
   */
  authenticate() {
    let url = `${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/auth?response_type=code&client_id=${this.config.client}&scope=openid&nocache=${(new Date()).getTime()}&redirect_uri=${this.config.redirectUrl}`
    // if (this.config.clientSecret !== "" && this.config.clientSecret !== undefined) {
    //   url = url + "&client_secret=" + this.config.clientSecret
    // }
    // let url = `${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/auth?response_type=code&client_id=${this.config.client}&scope=openid&nocache=${(new Date()).getTime()}`
    window.location.href = url;
  }

  checkForSession() {
    const urlParams = new URLSearchParams(window.location.search);
    this.code = urlParams.get('code');
    this.session_state = urlParams.get('session_state');
    if (this.code && this.session_state) {
      this.codeFlowAuth();
      window.history.pushState(null, null, document.location.pathname);
    }
  }

  fetchToken(formData) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', `${this.keycloakUrl}/token`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let self = this;
    let resp = null;

    xhr.onload = function() {
      switch (xhr.status) {
        case (400): // 400 - bad request
          self.accessToken = null;
          self.refreshToken = null;
          resp = JSON.parse(xhr.responseText);
          self.errCallback(resp);
          break;

        case (xhr.status !== 200): // 200 - ok
          resp = JSON.parse(xhr.responseText);
          // self.errCallback(resp);
          break;

        default:
          let keycloakResp = {
            access_token: null,
            identify_token: null,
            refresh_expires_in: 0,
          }
          try {
            keycloakResp = JSON.parse(xhr.responseText);
          }
          catch (err) {
            console.log(`Error parsing authentication token: ${err}`)
          }
          self.accessToken = keycloakResp.access_token;
          self.identityToken = keycloakResp.identity_token;
          const remainingTime = keycloakResp.refresh_expires_in;
          if (remainingTime <= self.sessionEndWarning) {
            if (self.sessionEndingCallback)
              self.sessionEndingCallback(remainingTime);
          }
          setTimeout(function() {
            self.refresh(keycloakResp.refresh_token);
          }, self.refreshInterval(keycloakResp.expires_in));
          self.authCallback(keycloakResp.access_token);
      }
    };

    xhr.onerror = function() {
      if (xhr.responseText) {
        self.errCallback(JSON.parse(xhr.responseText));
      } else {
        self.errCallback({ "error": "Unable to fetch the token due to a Network Error" });
      }
    }
    xhr.send(urlencodeFormData(formData).toString().replaceAll("%0D", "")); // URL encoding do not remove %0D escape characters
  }

  codeFlowAuth() {
    console.log("fetching token");
    var data = new FormData();
    data.append('code', this.code);
    data.append('grant_type', 'authorization_code');
    data.append('client_id', this.config.client);
    data.append('client_secret', this.config.clientSecret); // required depending on keycloak client authentication config
    console.log(this.config.redirectUrl)
    data.append('redirect_uri', this.config.redirectUrl);

    this.fetchToken(data);
  }

  refresh(refreshToken) {
    console.log("refreshing token");
    var data = new FormData();
    data.append('refresh_token', refreshToken);
    data.append('grant_type', 'refresh_token');
    data.append('client_id', this.config.client);
    data.append('client_secret', this.config.clientSecret); // keycloak configured to authenticate client with only id and secret
    this.fetchToken(data);
  }

  directGrantAuthenticate(user, pass) {
    var data = new FormData();
    data.append('grant_type', 'password');
    data.append('client_id', this.config.client);
    data.append('scope', 'openid profile');
    data.append('username', user);
    data.append('password', pass);
    this.fetchToken(data);
  }

  directGrantX509Authenticate() {
    var data = new FormData();
    data.append('grant_type', 'password');
    data.append('client_id', this.config.client);
    data.append('scope', 'openid profile');
    data.append('username', '');
    data.append('password', '');
    this.fetchToken(data);
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdentityToken() {
    return this.identityToken;
  }
}

const tokenToObject = function(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export { Keycloak as default, tokenToObject };
