import React from 'react';
import { connect } from 'redux-bundler-react';
import Banner from '../main/banner'

class LoginPage extends React.Component {
  render(){
    return (
      <div >
        <Banner/>
          <div className="container">
            <div>
              <h2>Welcome to the NSI Survey Tool</h2>              
            </div>
            <div>
              <p>Please Login to proceed</p>
            </div>
            <div>
              <a href="/main">Login</a>
            </div>
          </div>
        </div>
    )
  }
}
export default connect(
  LoginPage
  );