import { createRouteBundle } from 'redux-bundler';
import LoginPage from '../containers/login/LoginPage'
import MainPage from '../containers/main/MainPage';
import FourOhFour from '../containers/404';



const routes = createRouteBundle({
  '/': LoginPage,
  '/main': MainPage,
  '*': FourOhFour
})

export {routes as default}