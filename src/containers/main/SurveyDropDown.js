import React from 'react'

const SurveyDropDown = (props) => {
    const valName = props.ddName
    const vals = props.vals
    const event = props.event
    const target = props.target    
    const targetField = props.targetField
    return(
        <div>
            <div style={{width: "375px", height: "24px"}}>
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{valName}</button>
                <div className="dropdown-menu" id="damcatDD">
                {
                    vals.map((item,i) => {                        
                        return (
                            <button className="dropdown-item" type="button" key={i} onClick={() => event(item.DC, targetField)}>{item.DC}</button>
                        )
                    })                                                            
                }   
                </div>
             
            <input type="text" className="form-control" id="demo" aria-label="Text input with dropdown button" value={target}>                
            </input>
            </div>
            </div> 
        </div>
        
    )
}

export default SurveyDropDown