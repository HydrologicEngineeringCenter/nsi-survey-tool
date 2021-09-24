// background on OAuth 2.0
// https://datatracker.ietf.org/doc/html/rfc6749

const urlencodeFormData = fd => new URLSearchParams([...fd])

class Keycloak{
    constructor(config){
        this.keycloakResp=null;
        this.config=config;
    }

    authenticate(){ // redirect to auth endpoint
        const url = `${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/auth?response_type=code&client_id=${this.config.client}&scope=openid&redirect_uri=${this.config.redirectUrl}`;
        window.location.href=url;
    }

    // response_type = code
    checkForResponse(authCallback){
        const urlParams = new URLSearchParams(window.location.search);
        this.code=urlParams.get('code');
        this.session_state=urlParams.get('session_state');
        if(this.code && this.session_state){
            this.getKeycloakAuth(authCallback);
            window.history.pushState(null,null, document.location.pathname);
        }
    }

    // authorization code grant
    getKeycloakAuth(authCallback){
        console.log("fetching token");
        let tokenUrl=`${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/token`
        var data = new FormData();
        data.append('code', this.code);
        data.append('grant_type', 'authorization_code');
        data.append('client_id', this.config.client);
        data.append('redirect_uri', this.config.redirectUrl);

        var xhr = new XMLHttpRequest();
        xhr.open('POST',tokenUrl, true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        let self=this;
        xhr.onload = function () {
            if(xhr.status!==200){
                console.log(xhr.responseText);
                
            } else {
                self.keycloakResp=JSON.parse(xhr.responseText);
                self.code=null;
                authCallback()
            }
        };
        xhr.onerror=function(){
            console.log(xhr.responseText)
        }
        xhr.send(urlencodeFormData(data));
    }

    getAccessToken(){
        return this.keycloakResp.access_token;
    }

    getIdentityToken(){
        return this.keycloakResp.identity_token;
    }

    getRefreshToken(){
        return this.keycloakResp.refresh_token;
    }

    // resource owner password credentials grant
    directGrantAuthenticate(user,pass,authCallback){
        let url = `${this.config.keycloakUrl}/realms/${this.config.realm}/protocol/openid-connect/token`
        var data = new FormData();
        data.append('grant_type', 'password');
        data.append('client_id', this.config.client);
        data.append('scope', 'openid profile');
        data.append('username',user);
        data.append('password',pass);
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url, true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        let self=this;
        xhr.onload = function () {
            if(xhr.status!==200){
                console.log(xhr.responseText);
                
            } else {
                self.keycloakResp=JSON.parse(xhr.responseText);
                authCallback();
            }
        };
        xhr.onerror=function(){
            console.log(xhr.responseText)
        }
        xhr.send(urlencodeFormData(data));
    }

    directGrantX509Authenticate(authCallback){
        this.directGrantAuthenticate("", "", authCallback)
    }

}

const tokenToObject=function(token){
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export {Keycloak as default,tokenToObject};