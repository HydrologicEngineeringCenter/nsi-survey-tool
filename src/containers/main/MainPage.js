import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page';
import NavBar from '../components/navbar/NavBar';

function MainPage(props) {
  const { doUpdateUrl, authAccessToken: authNSIToken } = props;

  if (!authNSIToken) {
    let base = process.env.REACT_APP_HOMEPAGE
    doUpdateUrl("/" + base);
  }

  return (
    <div >
      <NavBar />
      <div className="row no-gutters">
        <Map />
      </div>
    </div>
  )
}

export default connect(
  'doUpdateUrl',
  'selectAuthAccessToken',
  MainPage
);
