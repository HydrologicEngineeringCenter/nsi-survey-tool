import React from 'react';
import { connect } from 'redux-bundler-react';

function App({ route }) {
  const Route = route;
  return (
    <div>
      <Route />
    </div>
  );
}

export default connect(
  'selectRoute',
  App
);
