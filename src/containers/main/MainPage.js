import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page';
import NavBar from '../components/navbar/NavBar';

function MainPage(props){
    const {doUpdateUrl,authNSIToken} = props;

    // if(!authNSIToken){
    //   doUpdateUrl("/nsi-survey/");
    // }

    return (
      <div >
        <NavBar/>
          <div className="row no-gutters">
              <Map/>         
          </div>
        </div>
    )
}

export default connect(
  'doUpdateUrl',
  'selectAuthNSIToken',
  MainPage
);