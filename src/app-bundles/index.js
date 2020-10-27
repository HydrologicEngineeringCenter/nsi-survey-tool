import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'

import routesBundle from './routes-bundle';
import surveyBundle from './survey-tray-bundle/survey-tray-bundle'

export default composeBundles(
  routesBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
  surveyBundle,
);