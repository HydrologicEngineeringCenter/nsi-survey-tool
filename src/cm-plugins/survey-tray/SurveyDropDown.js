import React from 'react'

const SurveyDropDown = (props) => {
    const valName = props.ddName
    const vals = props.vals
    const event = props.event
    const target = props.target    
    const targetField = props.targetField     
    const stylin = props.stylin  
    return(
        <div>
            <div style={stylin}>
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={stylin}>{valName}</button>
                <div className="dropdown-menu" id={target}>
                {                    
                    vals.map((item,i) => {                        
                        return (
                            <button className="dropdown-item" type="button" key={i} onClick={() => event(item, targetField)}>{item}</button>
                        )
                    })                                                            
                }   
                </div>
             
            <input type="text" className="form-control" aria-label="Text input with dropdown button" style={stylin} value={target}>                
            </input>
            </div>
            </div> 
        </div>
        
    )
}

export default SurveyDropDown