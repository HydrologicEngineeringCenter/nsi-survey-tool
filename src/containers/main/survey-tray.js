import React from 'react';
import { connect } from 'redux-bundler-react';

class SurveyTray extends React.Component {
    //https://getbootstrap.com/docs/4.0/components/input-group/
  render(){
    return (
        <nav id="sidebar" class="light bg-light">
            <div class="sidebar-header">
                <h3>SURVEY INPUT DATA</h3>
            </div>
            <div class="sidebar-content">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Damage Category</button>
                        <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">RESIDENTIAL</a>
                        <a class="dropdown-item" href="#">COMMERCIAL</a>
                        <a class="dropdown-item" href="#">INDUSTRIAL</a>
                        <a class="dropdown-item" href="#">COMMERCIAL</a>
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Foundation Height</span>
                    </div>
                    <input type="text" class="form-control"/>
                </div>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <button class="btn btn-outline-secondary" type="button" aria-haspopup="true" aria-expanded="false">Update Location</button>
                        <div class="input-group-prepend">
                            <span class="input-group-text">x</span>
                            <input type="text" class="form-control"/>
                        </div>
                        <div class="input-group-prepend">
                            <span class="input-group-text">y</span>
                            <input type="text" class="form-control"/>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
  }
}
export default connect(
  SurveyTray
);