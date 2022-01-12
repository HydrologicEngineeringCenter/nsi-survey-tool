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
import surveyBundle from './surveyBundle'
import generalBundle from './generalBundle'
import manageSurveyBundle from './manageSurveyBundle';

export default composeBundles(
  routesBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  userBundle,
  surveyBundle,
  generalBundle,
  manageSurveyBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);
