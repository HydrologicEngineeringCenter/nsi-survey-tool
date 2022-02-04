import {
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'

import authKeycloakBundle from './auth-keycloak-bundle-refactored';
import routesBundle from './routes-bundle';
import createNewSurveyBundle from './create-new-survey-bundle';
import userBundle from './user-bundle'
import surveyBundle from './survey-bundle'
import generalBundle from './general-bundle'
import manageSurveyBundle from './manage-survey-bundle';
import storesConnector from './monkeypatch-bundler'
import elements from "./element-bundle"

export default composeBundles(
  routesBundle,
  authKeycloakBundle,
  createNewSurveyBundle,
  userBundle,
  surveyBundle,
  generalBundle,
  manageSurveyBundle,
  storesConnector,
  elements,
  createUrlBundle(),
  createCacheBundle(cache.set),
);
