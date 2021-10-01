import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'
// import authBundle from './auth-bundle';

import authKeycloakBundle from './auth-keycloak-bundle';
import routesBundle from './routes-bundle';
import createNewSurveyBundle from './create-new-survey-bundle';

export default composeBundles(
  routesBundle,
  // authBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);