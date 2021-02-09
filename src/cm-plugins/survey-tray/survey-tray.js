import React from 'react';
import { connect } from 'redux-bundler-react';
import surveyTrayBundle from './survey-tray-bundle';

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
const qualities = [
    'Average',
    'Economy',
    'Luxury',
    'Custom'      
]
const constTypes = [
    'Brick/Masonry',
    'Wood',
    'Concrete',
    'Manufactured',
    'Steel',        
    'Unknown'      
]
const garageTypes = [
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
const roofStyles = [
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

function SurveyTray(props){

    const {surveyData:survey,doSurveyUpdateData,doSurveyModifyXY,doSurveyZoom,doSurveyStreetView} = props;
    const validSurvey = survey.fdId!==-1;

    const handleChange=(field)=>(e)=>{
        const val= e.target.value
        const s={...survey,[field]:val}
        doSurveyUpdateData(s);
    }

    function renderNoSurvey(){
        return(
            <React.Fragment>
                <div className="st-nosurvey">
                    Click the "Get Survey button to request a survey to validate"
                </div>
            </React.Fragment>
        )
    }

    function renderSurvey(){
        return(
            <React.Fragment>
                <div style={{"width":"100%","text-align":"center"}}>
                    Editing Survey 1234
                </div>
                
                <div class="card border-secondary mb-3 st-card" >
                    <div class="card-header st-card-header">Categories</div>
                    <div class="card-body st-card-body">
                        <div class="form-group">
                            <label for="damcat">Damage Category</label>
                            <select class="form-control st-input" id="damcat" onChange={handleChange("damcat")}>
                                {damcats.map(cat=>(cat===survey.damcat)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="occclass">Occupancy Class</label>
                            <select class="form-control st-input" id="occclass" onChange={handleChange("occupancyType")}>
                                {occs.Unknown.map(cat=>(cat===survey.occupancyType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card border-secondary mb-3 st-card" >
                    <div class="card-header st-card-header">Foundation</div>
                    <div class="card-body st-card-body">
                        <div class="form-group">
                            <label for="foundtype">Foundation Type</label>
                            <select class="form-control st-input" id="foundtypes" onChange={handleChange("foundType")}>
                                {foundTypes.map(cat=>(cat===survey.foundType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="foundheight">Foundation Height (ft)</label>
                            <input type="text" class="form-control st-input" id="foundheight" placeholder="" onChange={handleChange("foundHt")}/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="occclass">RS Means Type</label>
                    <select class="form-control st-input" id="occclass" onChange={handleChange("rsMeansType")}>
                        {rsMeansTypes.Unknown.map(cat=>(cat===survey.rsmeansType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                    </select>

                    <label for="occclass">Quality</label>
                    <select class="form-control st-input" id="occclass" onChange={handleChange("quality")}>
                        {qualities.map(cat=>(cat===survey.quality)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                    </select>

                    <label for="occclass">Exterior Construction Type</label>
                    <select class="form-control st-input" id="occclass" onChange={handleChange("constType")}>
                        {constTypes.map(cat=>(cat===survey.constType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                    </select>

                    <label for="occclass">Garage Type</label>
                    <select class="form-control st-input" id="occclass" onChange={handleChange("garageType")}>
                        {garageTypes.map(cat=>(cat===survey.garageType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                    </select>

                    <label for="occclass">Roof Style</label>
                    <select class="form-control st-input" id="occclass" onChange={handleChange("rootStyle")}>
                        {roofStyles.map(cat=>(cat===survey.rootStyle)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                    </select>

                    <label for="occclass">Number of Stories</label>
                    <input type="text" value={survey.stories} class="form-control st-input" id="foundheight" placeholder="" onChange={handleChange("stories")}/>

                    <label for="occclass">Occupied SQ Feet</label>
                    <input type="text" value={survey.sqFt} class="form-control st-input" id="foundheight" placeholder="" onChange={handleChange("sqFt")}/>
                </div>

                <div class="card border-secondary mb-3 st-card" >
                    <div class="card-header">Location Information</div>
                    
                    <div class="card-body">
                        <div style={{display:"flex"}}>
                            <div style={{display:"flex"}}>
                            X:
                            <input type="text" value={survey.x} class="form-control st-input" id="xcoord" placeholder="" onChange={handleChange("x")}/>
                            </div>
                            <div style={{display:"flex"}}>
                            Y:
                            <input type="text" value={survey.y} class="form-control st-input" id="ycoord" placeholder="" onChange={handleChange("y")}/>
                            </div>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-secondary basic-toolbar-btn st-btn-tb">
                            <i className="mdi mdi-map-marker-plus" onClick={doSurveyModifyXY}/>
                        </button>
                        <button className="btn btn-secondary basic-toolbar-btn st-btn-tb" onClick={doSurveyZoom}>
                            <i className="mdi mdi-magnify-plus" />
                        </button>
                        <button className="btn btn-secondary basic-toolbar-btn st-btn-tb" onClick={doSurveyStreetView}>
                            <i className="mdi mdi-google-street-view" />
                        </button>
                    </div>     
                </div>
            </React.Fragment>
        )
    }

    return(
        <div className="st-main">
            <div style={{"display":"flex"}}>
                <button className="btn btn-secondary basic-toolbar-btn st-btn-tb1" disabled={validSurvey}>
                    <i className="mdi mdi-file-download" />
                    Get Survey
                </button>
                <div style={{"width":"10px"}} />
                <button className="btn btn-secondary basic-toolbar-btn st-btn-tb1" disabled={!validSurvey}>
                    <i className="mdi mdi-file-upload" />
                    Save Survey
                </button> 
            </div>
            {(validSurvey)? renderSurvey(): renderNoSurvey()}
        </div>
    )
}

export default connect (
    'doSurveyUpdateData',
    'doSurveyModifyXY',
    'doSurveyZoom',
    'doSurveyStreetView',
    'selectSurveyData',
    SurveyTray
);