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
      const {doSelectOccupancyType, occupancyType, doSelectDamCat, damCat,doSelectStructure,doSelectGenericDropDown,
        doSelectFoundHt,x,foundHt,doSelectNumStory,numStory,doSelectSqFt,sqFt,doSelectGenericVal,foundType,
        rsmeansType,quality,constType,garage,roofStyle} = this.props
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
        {DC: 'PUBLIC'}
    ]
    const foundTypes = [
        {DC: 'BASEMENT'},
        {DC: 'CRAWL'},
        {DC: 'PIER'}
    ]
    const rsMeansTypes = [
        {DC: 'OFFICE'},
        {DC: 'SINGLE-FAMILY RES'}
    ]
    const Qualities = [
        {DC: 'LUXURY'},
        {DC: 'CUSTOM'},
        {DC: 'AVERAGE'},
        {DC: 'ECONOMY'}
    ]
    const ConstTypes = [
        {DC: 'BRICK'},
        {DC: 'VINYL SIDING'},
        {DC: 'STUCCO'},
        {DC: 'CEMENT'}
    ]
    const GarageTypes = [
        {DC: 'ONE CAR ATTACHED'},
        {DC: 'ONE CAR DETACHED'},
        {DC: 'TWO CAR ATTACHED'},
        {DC: 'TWO CAR DETACHED'}
    ]
    const RoofStyles = [
        {DC: 'HIP'},
        {DC: 'FLAT'},
        {DC: 'GABLE'}
    ]
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
                    event={doSelectGenericDropDown}
                    target={occupancyType}
                    targetField='occupancyType'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Damage Category"
                    vals={damcats}
                    event={doSelectGenericDropDown}
                    target={damCat}
                    targetField='damcat'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Foundation Type"
                    vals={foundTypes}
                    event={doSelectGenericDropDown}
                    target={foundType}
                    targetField='found_type'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="RS Means Type"
                    vals={rsMeansTypes}
                    event={doSelectGenericDropDown}
                    target={rsmeansType}
                    targetField='rsmeans_type'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Quality"
                    vals={Qualities}
                    event={doSelectGenericDropDown}
                    target={quality}
                    targetField='quality'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Exterior Construction Type"
                    vals={ConstTypes}
                    event={doSelectGenericDropDown}
                    target={constType}
                    targetField='const_type'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Garage Type"
                    vals={GarageTypes}
                    event={doSelectGenericDropDown}
                    target={garage}
                    targetField='garage'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Roof Style"
                    vals={RoofStyles}
                    event={doSelectGenericDropDown}
                    target={roofStyle}
                    targetField='roof_style'
                    />                    
                </div>                     
                {/* <div>
                    <button onClick={() => {console.log(occupancyType)}}>test</button>
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
                    event={doSelectGenericVal}
                    targetField='found_ht'
                    validator={(val) =>{return !isNaN(val)}}
                    />
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Number of Stories"
                    event={doSelectGenericVal}
                    targetField='stories'
                    validator={(val) =>{return !isNaN(val)}}
                    />
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Occupied Square Feet"
                    event={doSelectGenericVal}
                    targetField='sq_ft'
                    validator={(val) =>{return !isNaN(val)}}
                    />
                </div>
                {/* <div className="input-group mb-3">
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
                </div> */}
                <div className="input-group mb-3">
                    <button type="button" onClick={() => doSelectStructure()}>Next Structure</button>
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
    'doSelectGenericVal',
    'doSelectGenericDropDown',
    'selectFoundType',
    'selectRsmeansType',
    'selectQuality',
    'selectConstType',
    'selectGarage',
    'selectRoofStyle',
  SurveyTray,
);