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
      const {occupancyType, damCat,doModifyStructure,doModifyGenericDropDown,x,foundHt,numStory,sqFt,doModifyGenericVal,foundType,
        rsmeansType,quality,constType,garage,roofStyle,foundHt_isInvalid} = this.props
    const occs = {
        "Unknown": ['RES1','RES2','RES3','RES4','RES5','RES6','IND1','IND2','IND3','IND4','IND5','IND6','COM1','COM2','COM3','COM4','COM5','COM6','COM7','COM8','COM9','AGR1','GOV1','GOV2','REL1','EDU1','EDU2'],
        "RESIDENTIAL": ['RES1','RES2','RES3','RES4','RES5','RES6'],
        "INDUSTRIAL": ['IND1','IND2','IND3','IND4','IND5','IND6'],
        "COMMERICAL": ['COM1','COM2','COM3','COM4','COM5','COM6','COM7','COM8','COM9','AGR1'],
        "PUBLIC": ['GOV1','GOV2','REL1','EDU1','EDU2']      
    }
    const damcats = [
        'RESIDENTIAL',
        'INDUSTRIAL',
        'COMMERICAL',
        'PUBLIC'      
    ]
    const foundTypes = [
        'BASEMENT',
        'CRAWL',
        'SOLID WALL',
        'PIER',
        'PILE',
        'FILL',
        'SLAB',
        'UNKNOWN'      
    ]
    const rsMeansTypes = {
        "Unknown": ['Apartment','Nursing Home','Hangar, Aircraft','Bus Terminal','School - Elementary','School - High','School - Vocational','Community Center','Post Office','Church','Fire Station','Police Station','Warehouse','Factory','Store, Retail','Garage, Repair','Restaurant','Post Frame Barn','Bowling Alley','Car Wash','Office','Convenience Store','Country Club','Funeral Home','Day Care Center','Fast Food Restaurant','Bank','Supermarket','Gymnasium','Hospital','Hotel','Motel','Medical Office','Garage, Service Station','Garage, Parking','Rink Hockey, Indoor Soccer','Auditorium','Garage, Auto Sales','Veterinary Hospital','Other'],
        "RESIDENTIAL": ['Apartment', 'Nursing Home','Other'],
        "INDUSTRIAL": ['Warehouse', 'Factory','Other'],
        "COMMERICAL": ['Store, Retail','Garage, Repair','Restaurant','Post Frame Barn','Bowling Alley','Car Wash','Office','Convenience Store','Country Club','Funeral Home','Day Care Center','Fast Food Restaurant','Bank','Supermarket','Gymnasium','Hospital','Hotel','Motel','Medical Office','Garage, Service Station','Garage, Parking','Rink Hockey, Indoor Soccer','Auditorium','Garage, Auto Sales','Veterinary Hospital','Other'],
        "PUBLIC": ['Hangar, Aircraft','Bus Terminal','School - Elementary','School - High','School - Vocational','Community Center','Post Office','Church','Fire Station','Police Station','Other']
    }
    const Qualities = [
        'LUXURY',
        'CUSTOM',
        'AVERAGE',
        'ECONOMY'      
    ]
    const ConstTypes = [
        'MASONRY',
        'WOOD',
        'CONCRETE',
        'STEEL',
        'MANUFACTURED',
        'UNKNOWN'      
    ]
    const GarageTypes = [
        'ONE CAR ATTACHED',
        'ONE CAR DETACHED',
        'TWO CAR ATTACHED',
        'TWO CAR DETACHED'     
    ]
    const RoofStyles = [
        'HIP',
        'FLAT',
        'GABLE'      
    ]    
    return (
        <nav id="sidebar" className="light bg-light">
            <div className="sidebar-header">
                <h3>SURVEY INPUT DATA</h3>
            </div>
            <div className="sidebar-content">
                <fieldset style={{margin:'8px', border: '1px solid silver', padding:'8px', borderradius: '4px'}}>
                    <legend style={{padding:'4px'}}>Classification</legend>
                    <div className="input-group mb-3">
                        <SurveyDropDown 
                        ddName="Damage Category"
                        vals={damcats}
                        event={doModifyGenericDropDown}
                        target={damCat}
                        targetField='damcat'
                        />                    
                    </div>
                    <div className="input-group mb-3">
                        <SurveyDropDown 
                        ddName="Occupancy Class"
                        vals={occs[damCat]}
                        event={doModifyGenericDropDown}
                        target={occupancyType}
                        targetField='occupancyType'
                        />                    
                    </div>                      
                </fieldset>
                <fieldset style={{margin:'8px', border: '1px solid silver', padding:'8px', borderradius: '4px'}}>
                    <legend style={{padding:'2px'}}>Foundation Information</legend>
                    <div className="input-group mb-3">
                        <SurveyDropDown 
                        ddName="Foundation Type"
                        vals={foundTypes}
                        event={doModifyGenericDropDown}
                        target={foundType}
                        targetField='found_type'
                        />                    
                    </div>   
                    <div>
                        <SurveyTxtBox 
                        fieldName="Foundation Height"
                        event={doModifyGenericVal}
                        target={foundHt}
                        targetField='found_ht'
                        isInValid = {foundHt_isInvalid}
                        validator={(val) =>{return !isNaN(val)}}
                        />
                    </div>                    
                </fieldset>

                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="RS Means Type"
                    vals={rsMeansTypes[damCat]}
                    event={doModifyGenericDropDown}
                    target={rsmeansType}
                    targetField='rsmeans_type'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Quality"
                    vals={Qualities}
                    event={doModifyGenericDropDown}
                    target={quality}
                    targetField='quality'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Exterior Construction Type"
                    vals={ConstTypes}
                    event={doModifyGenericDropDown}
                    target={constType}
                    targetField='const_type'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Garage Type"
                    vals={GarageTypes}
                    event={doModifyGenericDropDown}
                    target={garage}
                    targetField='garage'
                    />                    
                </div>
                <div className="input-group mb-3">
                    <SurveyDropDown 
                    ddName="Roof Style"
                    vals={RoofStyles}
                    event={doModifyGenericDropDown}
                    target={roofStyle}
                    targetField='roof_style'
                    />                    
                </div>                     
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
                    fieldName="Number of Stories"
                    event={doModifyGenericVal}
                    targetField='stories'
                    target={numStory}
                    validator={(val) =>{return !isNaN(val)}}
                    />
                </div>
                <div>
                    <SurveyTxtBox 
                    fieldName="Occupied Square Feet"
                    event={doModifyGenericVal}
                    targetField='sq_ft'
                    target={sqFt}
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
                    <button type="button" onClick={() => doModifyStructure()}>Next Structure</button>
                </div>
            </div>
        </nav>
    )
  }
}
export default connect(
    'doModifyStructure',
    'doModifyGenericVal',
    'doModifyGenericDropDown',
    'selectOccupancyType',
    'selectDamCat',
    'selectFoundHt',
    'selectX',
    'selectNumStory',
    'selectSqFt',
    'selectFoundType',
    'selectFoundHt_isInvalid',
    'selectRsmeansType',
    'selectQuality',
    'selectConstType',
    'selectGarage',
    'selectRoofStyle',
  SurveyTray,
);