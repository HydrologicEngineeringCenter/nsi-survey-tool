import mapLayersBundle from '@corpsmap/corpsmap/src/application-bundles/map-layers-bundle';
import React from 'react';
import { connect } from 'redux-bundler-react';
import SurveyDropDown from "./SurveyDropDown.js"
import SurveyTxtBox from "./SurveyTxtBox.js"

class SurveyTray extends React.Component {
    //https://getbootstrap.com/docs/4.0/components/input-group/
//need to add a way for the user to say "no residential structures here."
//present to the user the occupancy type of the point - to guide what we want them to look at/for.
//need a quick access button to define the occupancy type names to technical discriptions

  render(){
      const {doSelectOccupancyType, occupancyType, doSelectDamCat, damCat,doSelectStructure,doSelectFoundHt,x,foundHt,doSelectNumStory,NumStory,doSelectSqFt,SqFt} = this.props
      const occs = [
          {DC: 'RES1'}, 
          {DC: 'RES2'},
          {DC: 'RES3'},
          {DC: 'AGR'},
          {DC: 'IND'},
          {DC: 'COM'},
          {DC: 'REL'},
          {DC: 'GOV'}
        ]
      const damcats = [
          {DC: 'RESIDENTIAL'}, 
          {DC: 'INDUSTRIAL'}, 
          {DC: 'COMMERCIAL'}, 
          {DC: 'PUBLIC'}]
    return (
        <nav id="sidebar" className="light bg-light">
            <div className="sidebar-header">
                <h3>SURVEY INPUT DATA</h3>
            </div>
            <div className="sidebar-content">
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Occupancy Class"
                    vals={occs}
                    event={doSelectOccupancyType}
                    target={occupancyType}
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Damage Category"
                    vals={damcats}
                    event={doSelectDamCat}
                    target={damCat}
                    />                    
                </div>               
                {/* <div>
                    <button onClick={() => {console.log(foundHt)}}>test</button>
                </div> */}
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" aria-haspopup="true" aria-expanded="false">Update Location</button>
                        <div className="input-group-prepend">
                            <span className="input-group-text">x</span>
                            <input type="text" className="form-control" value={x}/>
                        </div>
                        <div className="input-group-prepend">
                            <span className="input-group-text">y</span>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Foundation Height"
                    event={doSelectFoundHt}
                    validator={(val) =>{return isNaN(val)}}
                    />
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Number of Stories"
                    event={doSelectNumStory}
                    validator={(val) =>{return isNaN(val)}}
                    />
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Occupied Square Feet"
                    event={doSelectSqFt}
                    validator={(val) =>{return isNaN(val)}}
                    />
                </div>                
            </div>
        </nav>
    )
  }
}
export default connect(
    'doSelectOccupancyType',
    'selectOccupancyType',
    'doSelectDamCat',
    'selectDamCat',
    'doSelectStructure',
    'doSelectFoundHt',
    'selectFoundHt',
    'selectX',
    'doSelectNumStory',
    'selectNumStory',
    'doSelectSqFt',
    'selectSqFt',
  SurveyTray,
);