import { getConfiguredCache } from 'money-clip';
import pkg from '../../package.json';

// The version number should come from a config, this protects
// from trying load cached data when the internal data structures
// that your app expects have changed.
//
// Additionally, if you're caching user-specific data, you should build a
// version string that includes some user identifier along with your actual
// version number. This will ensure tha switching users won't result in
// someone loading someone else's cached data.
//
// So, there are gotchas, but it sure is cool when you've got it all set up.
export default getConfiguredCache({
  maxAge: 1000 * 60 * 60,
  // version: pkg.version,
  version: pkg.version,
})
