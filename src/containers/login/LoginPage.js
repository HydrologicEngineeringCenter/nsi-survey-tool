import React, { Fragment } from 'react';
import { connect } from 'redux-bundler-react';
import NavBar from '../components/navbar/NavBar';
import NsiDisclaimer from './NsiDisclaimer';

function LoginPage(props) {

  const { doUpdateUrl, authAccessToken } = props;

  // maintain client-side routing for organization instead of relying on the authorization server
  if (authAccessToken) {
    let base = process.env.REACT_APP_HOMEPAGE
    doUpdateUrl("/" + base + "/splash");
  }

  return (
    <Fragment>
      {/* {!authLoading && */}
      < div className="lg-bg">
        <NavBar />
        <div className="container-fluid">
          <NsiDisclaimer />
        </div>
      </div>
      {/* } */}
    </Fragment >
  )
}

export default connect(
  "doUpdateUrl",
  "selectAuthAccessToken",
  LoginPage
);
