import Keycloak from '../lib/auth/Keycloak';

const keycloakHost = process.env.REACT_APP_KEYCLOAK_HOST
const keycloakRealm = process.env.REACT_APP_KEYCLOAK_REALM
const keycloakClient = process.env.REACT_APP_KEYCLOAK_CLIENT
const keycloakRedirect = process.env.REACT_APP_REDIRECT_URI
const keycloakClientSecret = process.env.REACT_APP_CLIENT_SECRET // TODO - change to a more secured client authentication process

let keycloak = null; // elevate scope to file

const AUTH_ACTION = {
  INITIALIZED: "AUTH_ACTION.INITIALIZED",
  LOAD: "AUTH_ACTION.LOAD",
  AUTHENTICATE: "AUTH_ACTION.AUTHENTICATE",
  GET_TOKEN: "AUTH_ACTION.GET_TOKEN",
  UPDATE_KEYCLOAK: "AUTH_ACTION.UPDATE_KEYCLOAK",
  STORE_USER_INFO: "AUTH_ACTION.STORE_USER_INFO",
  STOP_LOADING: "AUTH_ACTION.STOP_LOADING",
  START_LOADING: "AUTH_ACTION.START_LOADING",
}

const initialData = {
  jwt: null,
  roles: null,
  fullName: null,
  userId: null,
  name: null,
  exp: null
};

const initialState = {
  data: initialData,
  loading: false,
  shouldQuery: false,
  err: null,
  lastError: null,
  lastFetch: null,
  keycloak: null, // object providing auth functionality
};


const auth = {

  name: "auth",

  getReducer: () => {
    return (state = initialState, { type, payload }) => {
      switch (type) {
        case AUTH_ACTION.AUTHENTICATE:
          keycloak.authenticate(); // sends a user authorization request to keycloak /auth endpoint
        case AUTH_ACTION.UPDATE_KEYCLOAK: // store auth access object
        case AUTH_ACTION.STORE_USER_INFO: // store auth user info
        case AUTH_ACTION.STOP_LOADING:
        default:
          return payload ? { ...state, ...payload } : { ...state }
      }
    }
  },

  /**
   * Initialize on store creation
   * @param {*} store
   */
  init: store => {

    keycloak = new Keycloak({

      keycloakUrl: keycloakHost,
      realm: keycloakRealm,
      client: keycloakClient,
      redirectUrl: keycloakRedirect,
      refreshInterval: 30,
      sessionEndWarning: 600,
      clientSecret: keycloakClientSecret,

      onAuthenticate: (token) => {
        store.doAuthUpdate(token);
      },

      onError: (err) => {
        store.doAuthUpdate(null);
      },

      onSessionEnding: (remainingTime) => {
        console.log(remainingTime);
        // store.doTriggerNotification("warning",`Your session is expiring in ${Math.round(remainingTime/60)} minutes.`)
      }
    });
    keycloak.checkForSession();
  },

  /**
   * Begins the authorization flow - can be use as an onClick handler
   */
  doAuthKeycloakAuthenticate: () => ({ dispatch, store }) => {
    dispatch({ type: AUTH_ACTION.AUTHENTICATE, loading: true });
  },

  doAuthStopLoading: () => ({ dispatch, store }) => {
    dispatch({ type: AUTH_ACTION.STOP_LOADING, loading: false });
  },

  /**
   * Update auth data in store
   * @param {*} token
   */
  doAuthUpdate: (token) => ({ dispatch, store }) => {

    // parse raw data
    let authInfo;
    if (token === null) {
      authInfo = {
        roles: [],
        name: "",
        sub: -1,
      }
    } else {
      authInfo = JSON.parse(atob(token.split(".")[1]));
    }

    dispatch({
      type: AUTH_ACTION.STORE_USER_INFO,
      payload: {
        loading: false,
        data: {
          jwt: token,
          roles: authInfo.roles,
          fullName: authInfo.preferred_username,
          userId: Number(authInfo.sub),
          name: authInfo.name ? authInfo.name.split(".")[0] : "",
          exp: authInfo.exp
        },
        lastFetch: Date.now(),
        requestErr: null,
      },
    });
  },

  selectAuthAccessToken: state => state.auth.data ? state.auth.data.jwt : null,
  selectAuthFullname: state => state.auth.data ? state.auth.data.fullName : null,
  selectAuth_roles: state => state.auth.data ? state.auth.data.roles : null,
  selectAuth_userId: state => state.auth.data ? state.auth.data.userId : null,
};

export default auth;
