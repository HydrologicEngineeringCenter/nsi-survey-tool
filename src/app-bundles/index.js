import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'
import authBundle from './auth-bundle';

import routesBundle from './routes-bundle';
import createNewSurveyBundle from '../containers/create-new-survey/create-new-survey-bundler';

export default composeBundles(
  routesBundle,
  authBundle,
  createNewSurveyBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);