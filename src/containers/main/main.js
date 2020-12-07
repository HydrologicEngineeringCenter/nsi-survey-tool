import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'
import SurveyTray from './survey-tray'

class MainPage extends React.Component {
  render(){
    return (
      <div >
        <Banner/>
          <div className="row no-gutters">
            <div className="col-md-9">
              <Map/>
            </div>
            <div className="col-md-3">
              <SurveyTray/>
            </div>            
          </div>

        </div>
    )
  }
}
export default connect(
  MainPage
  );