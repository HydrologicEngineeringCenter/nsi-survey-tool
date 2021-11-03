import {
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'

import authKeycloakBundle from './auth-keycloak-bundle-refactored';
import routesBundle from './routes-bundle';
import createNewSurveyBundle from './create-new-survey-bundle';

export default composeBundles(
  routesBundle,
  // authBundle,
  // authKeycloakBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);
