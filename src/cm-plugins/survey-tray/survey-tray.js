import React from 'react';
import { connect } from 'redux-bundler-react';

const fwLinkHost=process.env.REACT_APP_LINKHOST;

const occs = {
    "Unknown": ['RES1','RES2','RES3','RES3-AB','RES3-CD','RES3-EF','RES4','RES5','RES6','IND1','IND2','IND3','IND4','IND5','IND6','COM1','COM2','COM3','COM4','COM5','COM6','COM7','COM8','COM9','COM10','AGR1','GOV1','GOV2','REL1','EDU1','EDU2','UNKN'],
}
const damcats = [
    {val:'RES',display:'Residential'},
    {val:"IND",display:'Industrial'},
    {val:"COM",display:'Commercial'},
    {val:"PUB",display:'Public'},
    {val:"UNK",display:'Unknown'}
]

const foundTypes = [
    {val:"Empty", display:''},
    {val:"Base",display:'Basement'},
    {val:"Soli",display:'Solid Wall'},
    {val:"Craw",display:'Crawlspace'},
    {val:"Slab",display:'Slab'},
    {val:"Pile",display:'Pile'},
    {val:"Pier",display:'Pier'},
    {val:"Epir",display:'Enclosed Pier'},
    {val:"Mat",display:'Mat'},
    {val:"Cont",display:'Continuous Footing'},
    {val:"SLWB",display:'Split Level Basement'},
    {val:"SLNB",display:'Split Level No Basement'},
    {val:"SLUN",display:'Split Level Unk Basement'},
    {val:"Unkn",display:'Unknown'}
]

const rsMeansTypes = {
    "Unknown": ['','SFR-Economy','SFR-Average','SFR-Custom','SFR-Luxury','Apartment','Manufactured','Aircraft Hangar','Auditorium','Bank','Bowling Alley','Bus Terminal','Car Wash','Church','Community Center','Country Club','Day Care Center','Factory','Fire Station','Funeral Home','Garage - Auto Sales','Garage - Repair','Garage - Service Station','Gymnasium','Hospital','Hotel','Medical Office', 'Motel','Nursing Home','Office','Parking Garage','Post Office','Police Station','Post Frame Barn','Restaurant - Dining','Restaurant - Fast Food','Rink - Hockey or Soccer','School - Elementary','School - High','School - Vocational','Store - Convenience','Store - Retail','Store - Supermarket','Veterinary Hospital','Warehouse','Other','Unknown']
}
const qualities = [
    '',
    'Dilapidated',
    'Average',
    'Like New', 
    'Unknown' 
]
const constTypes = [
    '',
    'Wood',
    'Brick',
    'Stucco',
    'Manufactured',
    'Masonry or Concrete',
    'Steel', 
    'Other',       
    'Unknown'    
]
const garageTypes = [
    '',
    'None',
    'One Car Attached',
    'Two Car Attached',
    'Three Car Attached',
    'One Car Detached',
    'Two Car Detached',
    'Three Car Detached',
    'One Car Built In',
    'Two Car Built In',
    'Three Car Built In',
    'Unknown'            
]
const roofStyles = [
    '',
    'Simple Gable',
    'Gable and Valley',
    'Simple Hip',
    'Hip and Valley',
    'Mono-Pitched',
    'Offset Mono-Pitched',
    'Flat',
    'Gambrel Style',
    'Other',
    'Unknown'      
] 

function SurveyTray(props){

    const {surveyData:survey,
           doSurveyUpdateData,
           doSurveyModifyXY,
           doSurveyZoom,
           doSurveyStreetView,
           doSurveyFetch,
           doSurveySave,
           surveyLoading,
           surveySaved,
           allSurveysCompleted,
        } = props;

    const enableGet = surveySaved;    
    const validSurvey = survey.fdId!==-1;

    const numberValidation=(field,valtype)=>(e)=>{
        let val= e.target.value
        switch(valtype){
            case "int":
                val=isNaN(Number.parseInt(val,10))?0:Number.parseInt(val,10);
                break;
            case "dbl":
                val=isNaN(Number.parseFloat(val))?0.0:Number.parseFloat(val);
                break;
        }
        const s={...survey,[field]:val}
        doSurveyUpdateData(s);
    }

    const handleChange=(field)=>(e)=>{
        let val= e.target.value 
        const s={...survey,[field]:val}
        doSurveyUpdateData(s);
    }

    const handleValidityChange=(e)=>{
        const s={...survey,invalidStructure:e.target.checked}
        doSurveyUpdateData(s);
    }

    const handleNoStreetViewChange=(e)=>{
        const s={...survey,noStreetView:e.target.checked}
        doSurveyUpdateData(s);
    }

    function renderNoSurvey(){
        return(
            <>
                <div className="st-nosurvey">
                    Click the "Get Survey button to request a survey to validate"
                </div>
            </>
        )
    }

    function renderAllSurveysCompleted(){
        return(
            <>
                <div className="st-surveys-complete">
                    All surveys are complete.
                </div>
            </>
        )
    }

    function renderSurveyLoading(){
        return(
            <div className="st-survey-loading-container">
                <div className='st-survey-loading-text'>
                    Loading Survey
                </div>
                <div class="spinner">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                    <div class="bounce4"></div>
                </div>
            </div>
        )
    }

    function renderSurvey(){
        return(
            <div className="st-survey-form">
                <div style={{"width":"100%","text-align":"center","font-size":"14px","font-weight":"bold","margin-top":"5px"}}>
                    NSI Structure: {survey.fdId}
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="validStructure" onChange={handleValidityChange} checked={survey.invalidStructure}/>
                    <label className="form-check-label" for="validStructure">This is NOT a valid structure</label>
                </div>

                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="noStreetView" onChange={handleNoStreetViewChange} checked={survey.noStreetView}/>
                    <label className="form-check-label" for="noStreetView">There is no Street View</label>
                </div>

                <div className="card border-secondary mb-3 st-card" >
                    <div className="card-header st-card-header">Location Information</div>
                    
                    <div className="card-body">
                        <div style={{"font-size":"12px","line-height":"31px"}}>
                            <div style={{display:"flex"}}>
                             <div style={{"padding-right":"5px"}}>
                                X:
                            </div>   
                            <input type="text" value={survey.x} className="form-control st-input" id="xcoord" placeholder="" onChange={handleChange("x")}/>
                            </div>
                            <div style={{display:"flex"}}>
                            <div style={{"padding-right":"5px"}}>
                                Y:
                            </div>
                            <input type="text" value={survey.y} className="form-control st-input" id="ycoord" placeholder="" onChange={handleChange("y")}/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button title="Get Location from the Map" className="btn btn-secondary basic-toolbar-btn st-btn-tb" onClick={doSurveyModifyXY}>
                            <i className="mdi mdi-map-marker-plus"  />
                        </button>
                        <button title="Zoom to the Survey coordinates" className="btn btn-secondary basic-toolbar-btn st-btn-tb" onClick={doSurveyZoom}>
                            <i className="mdi mdi-magnify-plus" />
                        </button>
                        <button title="Open in Google Maps/Street View" className="btn btn-secondary basic-toolbar-btn st-btn-tb" onClick={doSurveyStreetView}>
                            <i className="mdi mdi-google-street-view" />
                        </button>
                    </div>     
                </div>
                
                <div className="card border-secondary mb-3 st-card" >
                    <div className="card-header st-card-header">Categories</div>
                    <div className="card-body st-card-body">
                        <div className="form-group">
                            <div style={{"display":"flex"}}>
                                <label style={{"flexGrow":1}}>Damage Category</label>
                                <a target="_blank" title="Help for Damage Category" href={`${fwLinkHost}nsi-survey-tool-damage-categories`}>
                                    <i className="mdi mdi-help-circle-outline" />
                                </a>
                            </div>
                            <select className="form-control st-input" id="damcat" onChange={handleChange("damcat")}>
                                {damcats.map(cat=>(cat.val===survey.damcat)?(<option value={cat.val} selected>{cat.display}</option>):(<option value={cat.val}>{cat.display}</option>))}
                            </select>
                        </div>
                        <div className="form-group">
                            <div style={{"display":"flex"}}>
                                <label style={{"flexGrow":1}}>Occupancy Type</label>
                                <a target="_blank" title="Help for Occupancy Type" href={`${fwLinkHost}nsi-survey-tool-occupancy-types`}>
                                    <i className="mdi mdi-help-circle-outline" />
                                </a>
                            </div>
                            <select className="form-control st-input" id="occclass" onChange={handleChange("occupancyType")}>
                                {occs.Unknown.map(cat=>(cat===survey.occupancyType)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="card border-secondary mb-3 st-card" >
                    <div className="card-header st-card-header">Foundation</div>
                    <div className="card-body st-card-body">
                        <div className="form-group">
                            <div style={{"display":"flex"}}>
                                <label style={{"flexGrow":1}}>Foundation Type</label>
                                <a target="_blank" title="Help for Foundation Type" href={`${fwLinkHost}nsi-survey-tool-foundation-type`}>
                                    <i className="mdi mdi-help-circle-outline" />
                                </a>
                            </div>
                            <select className="form-control st-input" id="foundtypes" onChange={handleChange("found_type")}>
                                {foundTypes.map(cat=>(cat.val===survey.found_type)?(<option value={cat.val} selected>{cat.display}</option>):(<option value={cat.val}>{cat.display}</option>))}
                            </select>
                        </div>
                        <div className="form-group">
                            <div style={{"display":"flex"}}>
                                <label style={{"flexGrow":1}}>Foundation Height(ft)</label>
                                <a target="_blank" title="Help for Foundation Height" href={`${fwLinkHost}nsi-survey-tool-foundation-height`}>
                                    <i className="mdi mdi-help-circle-outline" />
                                </a>
                            </div>
                            <input type="text" value={survey.found_ht} class="form-control st-input" id="foundheight" placeholder="" onChange={handleChange("found_ht")} onBlur={numberValidation("found_ht","dbl")}/>
                        </div>
                    </div>
                </div>

                
                <div className="card border-secondary mb-3 st-card" >
                    <div className="card-header st-card-header">Attributes</div>
                    <div className="card-body st-card-body">
                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>RS Means Type</label>
                            <a target="_blank" title="Help for RS Means Type" href={`${fwLinkHost}nsi-survey-tool-rsmeans-type`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <select className="form-control st-input" id="occclass" onChange={handleChange("rsmeans_type")}>
                            {rsMeansTypes.Unknown.map(cat=>(cat===survey.rsmeans_type)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                        </select>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Quality</label>
                            <a target="_blank" title="Help for Quality" href={`${fwLinkHost}nsi-survey-tool-rsmeans-quality`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <select className="form-control st-input" id="occclass" onChange={handleChange("quality")}>
                            {qualities.map(cat=>(cat===survey.quality)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                        </select>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Exterior Construction Type</label>
                            <a target="_blank" title="Help for Exterior Construction Types" href={`${fwLinkHost}nsi-survey-tool-exterior-construction`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <select className="form-control st-input" id="occclass" onChange={handleChange("const_type")}>
                            {constTypes.map(cat=>(cat===survey.const_type)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                        </select>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Garage Type</label>
                            <a target="_blank" title="Help for Garage Types" href={`${fwLinkHost}nsi-survey-tool-garage`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <select className="form-control st-input" id="occclass" onChange={handleChange("garage")}>
                            {garageTypes.map(cat=>(cat===survey.garage)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                        </select>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Roof Style</label>
                            <a target="_blank" title="Help for Roof Styles" href={`${fwLinkHost}nsi-survey-tool-roof-style`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <select className="form-control st-input" id="occclass" onChange={handleChange("roof_style")}>
                            {roofStyles.map(cat=>(cat===survey.roof_style)?(<option selected>{cat}</option>):(<option>{cat}</option>))}
                        </select>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Number of Stories</label>
                            <a target="_blank" title="Help for Number of Stories" href={`${fwLinkHost}nsi-survey-tool-stories`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <input type="text" value={survey.stories} className="form-control st-input" placeholder="" onChange={handleChange("stories")} onBlur={numberValidation("stories","dbl")}/>

                        <div style={{"display":"flex"}}>
                            <label style={{"flexGrow":1}}>Occupied SQ Feet</label>
                            <a target="_blank" title="Help for Occupied SQ Feet" href={`${fwLinkHost}nsi-survey-tool-square-footage`}>
                                <i className="mdi mdi-help-circle-outline" />
                            </a>
                        </div>
                        <input type="text" value={survey.sq_ft} className="form-control st-input" placeholder="" onChange={handleChange("sq_ft")} onBlur={numberValidation("sq_ft","dbl")}/>
                    </div>
                </div>

                
            </div>
        )
    }

    return(
        <div className="st-main">
            <div style={{"display":"flex"}}>
                <button className="btn btn-secondary basic-toolbar-btn st-btn-tb1" disabled={!enableGet} onClick={doSurveyFetch}>
                    <i className="mdi mdi-file-download" />
                    Get Survey
                </button>
                <div style={{"width":"10px"}} />
                <button className="btn btn-secondary basic-toolbar-btn st-btn-tb1" disabled={!validSurvey} onClick={doSurveySave}>
                    <i className="mdi mdi-file-upload" />
                    Save Survey
                </button> 
            </div>
            {allSurveysCompleted?renderAllSurveysCompleted():
                surveyLoading?renderSurveyLoading():
                    validSurvey?renderSurvey():renderNoSurvey()
            }
        </div>
    )
}

export default connect (
    'doSurveyUpdateData',
    'doSurveyModifyXY',
    'doSurveyZoom',
    'doSurveyStreetView',
    'doSurveyFetch',
    'doSurveySave',
    'selectSurveyLoading',
    'selectSurveyData',
    'selectSurveySaved',
    'selectAllSurveysCompleted',
    SurveyTray
);


/*
occtypes
- verify COM10
- verify split code




 -> add the new fields to the api
 -x added Valid Structure field and check if it is invalid
 -x update if survey was already saved
 -x enable/disable buttons
 -x show disclaimer first and login after user clicks ok
 - show notifications on save/errors/etc
 -x only show original values for damcat and occlass
 -x move marker on 'get location from map'
 -x drop download nsi tool
 - imagery for default background
 -x split occtype in nsi....RES1-YYYY
 - hexbins and layer zoom management


 - feedback
   - react components should be Upper and then Camel cased:
     - navbar => NavBar  in file NavBar.js
     - components should be functions unless class state is necessary
      - state should be
        - component module level if a singleton and only used by the component (my opinion)
        - hooks if used only to provide some value for the instance of a component
        - redux/bunder if necessary to support application functionality 
*/