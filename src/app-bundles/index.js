import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'
import authBundle from './auth-bundle';

import authKeycloakBundle from './auth-keycloak';
import routesBundle from './routes-bundle';
import createNewSurveyBundle from '../containers/create-new-survey/create-new-survey-bundle';

export default composeBundles(
  routesBundle,
  authBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);