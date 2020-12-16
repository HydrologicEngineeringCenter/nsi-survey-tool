import { createRouteBundle } from 'redux-bundler';
import Login from '../containers/login/login'
import Main from '../containers/main/main';
import FourOhFour from '../containers/404';

export default createRouteBundle({
  '/': Login,
  '/main': Main,
  '*': FourOhFour
})