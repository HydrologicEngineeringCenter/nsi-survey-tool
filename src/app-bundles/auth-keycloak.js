import Keycloak from '../lib/auth/Keycloak';

const keycloakHost=process.env.REACT_APP_KEYCLOAK_HOST
const keycloakRealm=process.env.REACT_APP_KEYCLOAK_REALM
const keycloakClient=process.env.REACT_APP_KEYCLOAK_CLIENT
const keycloakRedirect=process.env.REACT_APP_REDIRECT_URI
const keycloakClientSecret=process.env.REACT_APP_CLIENT_SECRET

let keycloak = null;

const auth = {
  name: "auth",
  getReducer: () => {
    const initialData = {
      data: [],
      loading: false,
      shouldQuery: false,
      err: null,
      lastError: null,
      lastFetch: null,
    };
    return (state = initialData, { type, payload }) => {
      switch (type) {
        case "AUTH_LOADING":
        case "AUTH_FETCH_START":
        case "AUTH_ERROR":
        case "AUTH_LOADED":
        case "AUTH_REMOVED":
          return Object.assign({}, state, payload);
        default:
      }
      return state;
    };
  },
  
  init:store=>{
    keycloak = new Keycloak({
      keycloakUrl:keycloakHost,
      realm:keycloakRealm,
      client:keycloakClient,
      redirectUri:keycloakRedirect,
      refreshInterval:30,
      sessionEndWarning:600,
      clientSecret:keycloakClientSecret,
      onAuthenticate:(token)=>{
        store.doAuthUpdate(token);
      },
      onError:(err)=>{
        console.log(err);
        store.doAuthUpdate(null);
      },
      onSessionEnding:(remainingTime)=>{
        console.log(remainingTime);
        store.doTriggerNotification("warning",`Your session is expiring in ${Math.round(remainingTime/60)} minutes.`)
      }
    });

    keycloak.checkForSession();
  },

  doKeycloakAuthenticate:()=>({dispatch,store})=>{  
    keycloak.authenticate();
  },

  doAuthUpdate:(token) =>({dispatch,store}) =>{
    let authInfo;
    if(token===null){
      authInfo={
        roles:[],
        name:"",
        sub:-1,
      }
    } else{
      authInfo = JSON.parse(atob(token.split(".")[1]));
    }
    dispatch({
      type: "AUTH_LOADED",
      payload: {
        loading: false,
        data: {
          jwt: token,
          roles: authInfo.roles,
          fullName: authInfo.name,
          userId: Number(authInfo.sub),
          name: authInfo.name ? authInfo.name.split(".")[0] : "",
          exp: authInfo.exp
        },
        lastFetch: Date.now(),
        requestErr: null,
      },
    });
    const uc = store.selectUserCheck();
    if(authInfo.roles && !uc.uexist){
      store.doLoadUserCheck();
    }
  },
  
  doGetToken: () => ({ dispatch }) => {
    dispatch({
      type: "AUTH_LOADING",
      payload: {
        loading: true,
        shouldQuery: true,
      },
    });
  },

  doLoadAuth: (callback) => ({ dispatch, store, apiGetAuth }) => {
    if(callback){
      callback();
    }
  },
  doAuthRemove: () => ({ dispatch }) => {
    dispatch({
      type: "AUTH_REMOVED",
      payload: {
        data: [],
      },
    });
  },
  selectAuthState: (state) => {
    return state.auth;
  },
  selectAuthData: (state) => {
    return state.auth.data;
  },
};
export default auth;
