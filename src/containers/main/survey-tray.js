import React from 'react';
import { connect } from 'redux-bundler-react';

class SurveyTray extends React.Component {
    //https://getbootstrap.com/docs/4.0/components/input-group/

  render(){
    return (
        <nav id="sidebar" className="light bg-light">
            <div className="sidebar-header">
                <h3>SURVEY INPUT DATA</h3>
            </div>
            <div className="sidebar-content">
                <div className="input-group mb-3">
                    <div classname="input-group-prepend">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Occupancy Type</button>
                        <div className="dropdown-menu" id="damcatDD">
                            <button className="dropdown-item" type="button">RESIDENTIAL</button>
                            <button className="dropdown-item" type="button">COMMERCIAL</button>
                            <button className="dropdown-item" type="button">INDUSTRIAL</button>
                            <button className="dropdown-item" type="button">COMMERCIAL</button>
                        </div>
                    </div>
                    <input type="text" className="form-control" id="demo" aria-label="Text input with dropdown button">
                    </input>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" aria-haspopup="true" aria-expanded="false">Update Location</button>
                        <div className="input-group-prepend">
                            <span className="input-group-text">x</span>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="input-group-prepend">
                            <span className="input-group-text">y</span>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Foundation Height</span>
                    </div>
                    <input type="text" className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Number of Stories</span>
                    </div>
                    <input type="text" className="form-control"/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="input-group-text" type="button" aria-haspopup="true" aria-expanded="false">Occupied Square Feet</button>
                    </div>
                    <input type="text" className="form-control"/>
                </div>
            </div>
        </nav>
    )
  }
}
export default connect(
  SurveyTray,
);