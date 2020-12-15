import React from 'react';
import { connect } from 'redux-bundler-react';
import Map from '../map/map-page'
import Banner from './banner'

class MainPage extends React.Component {
  render(){
    return (
      <div >
        <Banner/>
          <div className="row no-gutters">
              <Map/>         
          </div>

        </div>
    )
  }
}
export default connect(
  MainPage
  );