import {
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'

import authKeycloakBundle from './auth-keycloak-bundle-refactored';
import routesBundle from './routes-bundle';
import createNewSurveyBundle from './create-new-survey-bundle';
import userBundle from './userBundle'

export default composeBundles(
  routesBundle,
  // authBundle,
  // authKeycloakBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  userBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);
