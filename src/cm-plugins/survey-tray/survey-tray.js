
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
      const {occupancyType, damCat,doModifyStructure,doModifyGenericDropDown, doModifyXY, doZoomToCoords,doStreetViewByCoords,xval,x_isInvalid,yval,y_isInvalid,foundHt,numStory,sqFt,doModifyGenericVal,foundType,
        rsmeansType,quality,constType,garage,roofStyle,foundHt_isInvalid,numStory_isInvalid,sqFt_isInvalid} = this.props
    const occs = {
        "Unknown": ['RES1','RES2','RES3','RES4','RES5','RES6','IND1','IND2','IND3','IND4','IND5','IND6','COM1','COM2','COM3','COM4','COM5','COM6','COM7','COM8','COM9','AGR1','GOV1','GOV2','REL1','EDU1','EDU2'],
        "RESIDENTIAL": ['RES1','RES2','RES3','RES4','RES5','RES6'],
        "INDUSTRIAL": ['IND1','IND2','IND3','IND4','IND5','IND6'],
        "COMMERICAL": ['COM1','COM2','COM3','COM4','COM5','COM6','COM7','COM8','COM9','AGR1'],
        "PUBLIC": ['GOV1','GOV2','REL1','EDU1','EDU2']      
    }
    const damcats = [
        'Residential',
        'Industrial',
        'Commercial',
        'Public',
        'Unknown'      
    ]
    const foundTypes = [
        'Basement',
        'Solid Wall',
        'Crawlspace',
        'Slab',
        'Pile',
        'Pier',
        'Enclosed Pier',
        'Mat',
        'Continuous Footing',
        'Unknown'      
    ]
    const rsMeansTypes = {
        "Unknown": ['Apartment','Nursing Home','Hangar, Aircraft','Bus Terminal','School - Elementary','School - High','School - Vocational','Community Center','Post Office','Church','Fire Station','Police Station','Warehouse','Factory','Store, Retail','Garage, Repair','Restaurant','Post Frame Barn','Bowling Alley','Car Wash','Office','Convenience Store','Country Club','Funeral Home','Day Care Center','Fast Food Restaurant','Bank','Supermarket','Gymnasium','Hospital','Hotel','Motel','Medical Office','Garage, Service Station','Garage, Parking','Rink Hockey, Indoor Soccer','Auditorium','Garage, Auto Sales','Veterinary Hospital','Other'],
        "RESIDENTIAL": ['Apartment', 'Nursing Home','Other'],
        "INDUSTRIAL": ['Warehouse', 'Factory','Other'],
        "COMMERICAL": ['Store, Retail','Garage, Repair','Restaurant','Post Frame Barn','Bowling Alley','Car Wash','Office','Convenience Store','Country Club','Funeral Home','Day Care Center','Fast Food Restaurant','Bank','Supermarket','Gymnasium','Hospital','Hotel','Motel','Medical Office','Garage, Service Station','Garage, Parking','Rink Hockey, Indoor Soccer','Auditorium','Garage, Auto Sales','Veterinary Hospital','Other'],
        "PUBLIC": ['Hangar, Aircraft','Bus Terminal','School - Elementary','School - High','School - Vocational','Community Center','Post Office','Church','Fire Station','Police Station','Other']
    }
    const Qualities = [
        'Average',
        'Economy',
        'Luxury',
        'Custom'      
    ]
    const ConstTypes = [
        'Brick/Masonry',
        'Wood',
        'Concrete',
        'Manufactured',
        'Steel',        
        'Unknown'      
    ]
    const GarageTypes = [
        'None',
        'One Car Attached',
        'Two Car Attached',
        'Three Car Attached',
        'One Car Detached',
        'Two Car Detached',
        'Three Car Detached',
        'One Car Built In',
        'Two Car Built In',
        'Three Car Built In'            
    ]
    const RoofStyles = [
        'Simple Gable',
        'Gable and Valley',
        'Simple Hip',
        'Hip and Valley',
        'Mono-Pitched',
        'Offset Mono-Pitched',
        'Flat',
        'Gambrel Style',
        'Other'      
    ]       
    const superStylin = {
        borderColor: '#898989',       
        maxHeight: '24px',
        fontSize: '12px',
        padding: '5px',
        width: '195px',
        marginRight: '10px',  
        marginBottom: '5px',        
        textAlign: 'left',
        backgroundColor: '#ffffff'
    }
    const btnStylin = {
        marginRight: '5px',
        marginTop: '5px',
        backgroundColor: '#ffffff'
    }
  
    return (
        <nav id="sidebar" className="light" style={{minWidth: '400px', width: '400px'}}>
            <div className="sidebar-header" style={{marginLeft: '10px'}}>
                <h5>SURVEY INPUT DATA</h5>
            </div>
            <div className="sidebar-content">
                <fieldset style={{margin:'8px', border: '1px solid silver', padding:'4px', borderradius: '4px'}}>
                    <legend style={{margin:'0px', fontSize:'15px', border: 'none'}}>Classification</legend>
                    <div>
                        <SurveyDropDown 
                        ddName="Damage Category"
                        vals={damcats}
                        event={doModifyGenericDropDown}
                        target={damCat}
                        targetField='damcat'     
                        stylin={superStylin}                                    
                        />                    
                    </div>
                    <div>
                        <SurveyDropDown 
                        ddName="Occupancy Class"
                        vals={occs[damCat]}
                        event={doModifyGenericDropDown}
                        target={occupancyType}
                        targetField='occupancyType'
                        stylin={superStylin}
                        />                    
                    </div>                      
                </fieldset>
                <fieldset style={{margin:'8px', border: '1px solid silver', padding:'4px', borderradius: '4px'}}>
                    <legend style={{margin:'0px', fontSize:'15px', border: 'none'}}>Foundation Information</legend>
                    <div>
                        <SurveyDropDown 
                        ddName="Foundation Type"
                        vals={foundTypes}
                        event={doModifyGenericDropDown}
                        target={foundType}
                        targetField='found_type'
                        stylin={superStylin}
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
                        stylin={superStylin} 
                        />
                    </div>                    
                </fieldset>
                <fieldset style={{marginLeft: '13px'}}>
                    <div>
                        <SurveyDropDown 
                        ddName="RS Means Type"
                        vals={rsMeansTypes[damCat]}
                        event={doModifyGenericDropDown}
                        target={rsmeansType}
                        targetField='rsmeans_type'
                        stylin={superStylin}
                        />                    
                    </div>
                    <div>
                        <SurveyDropDown 
                        ddName="Quality"
                        vals={Qualities}
                        event={doModifyGenericDropDown}
                        target={quality}
                        targetField='quality'
                        stylin={superStylin}
                        />                    
                    </div>
                    <div >
                        <SurveyDropDown 
                        ddName="Exterior Construction Type"
                        vals={ConstTypes}
                        event={doModifyGenericDropDown}
                        target={constType}
                        targetField='const_type'
                        stylin={superStylin}
                        />                    
                    </div>
                    <div >
                        <SurveyDropDown 
                        ddName="Garage Type"
                        vals={GarageTypes}
                        event={doModifyGenericDropDown}
                        target={garage}
                        targetField='garage'
                        stylin={superStylin}
                        />                    
                    </div>
                    <div >
                        <SurveyDropDown 
                        ddName="Roof Style"
                        vals={RoofStyles}
                        event={doModifyGenericDropDown}
                        target={roofStyle}
                        targetField='roof_style'
                        stylin={superStylin}
                        />                    
                    </div>          
                    <div>
                        <SurveyTxtBox 
                        fieldName="Number of Stories"
                        event={doModifyGenericVal}
                        targetField='stories'
                        target={numStory}
                        isInValid = {numStory_isInvalid}
                        validator={(val) =>{return !isNaN(val)}}
                        stylin={superStylin} 
                        />
                    </div>
                    <div>
                        <SurveyTxtBox 
                        fieldName="Occupied Square Feet"
                        event={doModifyGenericVal}
                        targetField='sq_ft'
                        target={sqFt}
                        isInValid = {sqFt_isInvalid}
                        validator={(val) =>{return !isNaN(val)}}
                        stylin={superStylin} 
                        />
                    </div>       
                </fieldset>  
                <fieldset style={{margin:'8px', border: '1px solid silver', padding:'4px', borderradius: '4px'}}>
                    <legend style={{margin:'0px', fontSize:'15px', border: 'none'}}>Location Information</legend>                
                    <div >
                        <SurveyTxtBox 
                            fieldName="X"
                            event={doModifyGenericVal}
                            targetField='x'
                            target={xval}
                            isInValid = {x_isInvalid}
                            validator={(val) =>{return !isNaN(val)}}
                            stylin={superStylin} 
                        />
                    </div>
                    <div>
                    <SurveyTxtBox 
                            fieldName="Y"
                            event={doModifyGenericVal}
                            targetField='y'
                            target={yval}
                            isInValid = {y_isInvalid}
                            validator={(val) =>{return !isNaN(val)}}
                            stylin={superStylin} 
                        />
                    </div>               
                    <div>
                        <button type="button" aria-haspopup="true" aria-expanded="false" style={btnStylin} onClick={() => doModifyXY()}>Update Location</button>
                        <button type="button" aria-haspopup="true" aria-expanded="false" style={btnStylin} onClick={() => doZoomToCoords([xval,yval])}>Zoom To Location</button>
                        <button type="button" aria-haspopup="true" aria-expanded="false" style={btnStylin} onClick={() => doStreetViewByCoords([xval,yval])}>Street View</button>
                    </div> 
                </fieldset>    
                <fieldset style={{marginLeft: '13px'}}>
                <div>
                    <button type="button" style={btnStylin} onClick={() => doModifyStructure(true)}>Next Structure</button>
                    <button type="button" style={btnStylin} onClick={() => doModifyStructure(false)}>Skip Structure</button>
                </div>
                </fieldset>
            </div>
        </nav>
        
    )
  }
}
export default connect(
    'doModifyStructure',
    'doModifyGenericVal',
    'doModifyGenericDropDown',
    'doModifyXY',
    'doZoomToCoords',
    'doStreetViewByCoords',
    'selectOccupancyType',
    'selectDamCat',
    'selectFoundHt',
    'selectYval',
    'selectY_isInvalid',
    'selectXval',
    'selectX_isInvalid',
    'selectNumStory',
    'selectNumStory_isInvalid',
    'selectSqFt',
    'selectSqFt_isInvalid',
    'selectFoundType',
    'selectFoundHt_isInvalid',
    'selectRsmeansType',
    'selectQuality',
    'selectConstType',
    'selectGarage',
    'selectRoofStyle',
  SurveyTray,
);