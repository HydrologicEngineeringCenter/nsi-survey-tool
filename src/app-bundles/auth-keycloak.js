import Keycloak from '../lib/auth/Keycloak';

const keycloakHost=process.env.REACT_APP_KEYCLOAK_HOST;
const keycloakRealm=process.env.REACT_APP_KEYCLOAK_REALM;


const keycloakConfig = {
  keycloakUrl:keycloakHost,
  realm:keycloakRealm,
  client:"nsi-survey",
  redirectUrl:`${document.location.origin}${document.location.pathname}`,
}

const keycloak = new Keycloak(keycloakConfig);

const UPDATE_AUTH_TOKEN = 'UPDATE_AUTH_TOKEN';
const UPDATE_AUTH_USER = 'UPDATE_AUTH_USER';
const UPDATE_AUTH_USER_LOADING = 'UPDATE_AUTH_USER_LOADING';

const authHost=process.env.REACT_APP_AUTH_HOST
const apiHost=process.env.REACT_APP_APIHOST
const appId=process.env.REACT_APP_APPID

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export default {
  name: 'auth',
  getReducer: () => {
    const initialState = {
      loading: false,
      authUserLoading:false,
      token:null,
      userinfo:{}
    }

    return (state = initialState, { type, payload }) => {
      switch(type){
        case UPDATE_AUTH_TOKEN:
        case UPDATE_AUTH_USER:
        case UPDATE_AUTH_USER_LOADING:
          return({...state,...payload});
        default:
          return state;
      }
    }
  },

  init: store => {
    keycloak.checkForResponse(()=>{
      store.doAuthUpdate(keycloak.getAccessToken());
      store.doAuthFetchUserInfo();
      store.doGroupsFetchList();
      store.doMainInitRoutes(document.location); 
    });
  },

  doKeycloakAuthenticate:()=>({dispatch,store})=>{  
    keycloak.authenticate();
  },

  doAuthUpdate:(accessToken)=> ({dispatch,store}) => {
    dispatch({type:UPDATE_AUTH_TOKEN,payload:{'token':accessToken}});
  },

  doAuthFetchToken:()=>({dispatch,store})=>{
    fetch(`${authHost}/${appId}`, {
        method: 'get'
    }).then(function(response) {
        return response.text();
    }).then(function(data) {
        if(parseJwt(data)){
          //dispatch({type:UPDATE_AUTH_TOKEN,payload:{token:data}});
          store.doAuthUpdate(data);
          store.doAuthFetchUserInfo();
          // store.doModelFetchAll();
          store.doGroupsFetchList();
          store.doMainInitRoutes(document.location); 
          //store.doMainUpdateRoutes(document.location);
        }
    });      
  },

  doAuthFetchUserInfo:()=>({dispatch,store})=>{
    const token=store.selectAuthToken();
    dispatch({type:UPDATE_AUTH_USER_LOADING,payload:{'authUserLoading':true}});
    fetch(`${apiHost}/admin/userinfo`, {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        dispatch({type:UPDATE_AUTH_USER,payload:{userinfo:data}});
        dispatch({type:UPDATE_AUTH_USER_LOADING,payload:{'authUserLoading':false}});
    });      
  },

  //selectAppId:state=>state.auth.appid,
  selectAuthToken:state=>state.auth.token,
  selectAuthIsSysAdmin:state=>{
    if(state.auth.userinfo.sysAdmin){
      return state.auth.userinfo.sysAdmin;
    }else{
      return 0;
    }
  },
  selectAuthUserInfo:state=>state.auth.userinfo,
  selectAuthPendingToken:state=>keycloak.code?true:false,
  selectAuthUserLoading:state=>state.auth.authUserLoading,
  
}