import { createRouteBundle } from 'redux-bundler';
import Login from '../containers/login/login'
import Main from '../containers/main/main';
import FourOhFour from '../containers/404';



const routes = createRouteBundle({
  '/': Login,
  '/main': Main,
  '*': FourOhFour
})

export {routes as default}