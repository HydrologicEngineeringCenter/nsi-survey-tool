import { createRouteBundle } from 'redux-bundler';
import LoginPage from '../containers/login/LoginPage'
import MainPage from '../containers/main/MainPage';
import FourOhFour from '../containers/404';
import SurveySplashPage from '../containers/splash/SurveySplashPage';

const routes = createRouteBundle({
  '/nsi-survey': LoginPage,
  '/nsi-survey/': LoginPage,
  '/nsi-survey/main': MainPage,
  '/nsi-survey/main/': MainPage,
  '/nsi-survey/splash': SurveySplashPage,
  '/nsi-survey/splash/': SurveySplashPage,
  '*': FourOhFour
})

export {routes as default}