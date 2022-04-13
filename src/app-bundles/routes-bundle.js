import { createRouteBundle } from 'redux-bundler';
import LoginPage from '../containers/login/LoginPage'
import MainPage from '../containers/main/MainPage';
import FourOhFour from '../containers/404';
import SurveySplashPage from '../containers/splash/SurveySplashPage';

const base = process.env.REACT_APP_HOMEPAGE
var routeObj = {}
routeObj["/" + base] = LoginPage
routeObj["/" + base + "/"] = LoginPage
routeObj["/" + base + "/main"] = MainPage
routeObj["/" + base + "/main/"] = MainPage
routeObj["/" + base + "/splash"] = SurveySplashPage
routeObj["/" + base + "/splash/"] = SurveySplashPage
routeObj["*"] = FourOhFour
const routes = createRouteBundle(routeObj)

export { routes as default }
