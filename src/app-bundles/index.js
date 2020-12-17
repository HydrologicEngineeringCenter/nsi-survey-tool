import { 
  composeBundles,
  createUrlBundle,
  createCacheBundle
} from 'redux-bundler';

import cache from '@corpsmap/corpsmap/src/utils/cache'
import authBundle from './auth-bundle';

import routesBundle from './routes-bundle';

export default composeBundles(
  routesBundle,
  authBundle,
  createUrlBundle(),
  createCacheBundle(cache.set),
);