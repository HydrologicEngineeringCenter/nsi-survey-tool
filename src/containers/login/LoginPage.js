import React from 'react';
import { connect } from 'redux-bundler-react';
import NavBar from '../components/navbar/NavBar';
import NsiDisclaimer from './NsiDisclaimer';

function LoginPage() {
    return (
      <div className="lg-bg">
        <NavBar/>
          <div className="container-fluid">
            <NsiDisclaimer/>
          </div>
        </div>
    )
}

export default connect(
  LoginPage
);