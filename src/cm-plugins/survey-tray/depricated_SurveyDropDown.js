import React from 'react'

const igstyle={
    display:"flex"
}

const SurveyDropDown = (props) => {
    const valName = props.ddName
    const vals = props.vals
    const event = props.event
    const target = props.target    
    const targetField = props.targetField     
    const stylin = props.stylin  
    return(
        <div div  style={{...stylin,...igstyle}}>     
            <div>
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={stylin}>{valName}</button>
                    <div className="dropdown-menu" id={target} style={{maxHeight: '200px', overflow: 'scroll'}}>
                    {                    
                        vals.map((item,i) => {                        
                            return (
                                <button className="dropdown-item" type="button" style={{fontSize: '10px', lineHeight: '12px'}} key={i} onClick={() => event(item, targetField)}>{item}</button>
                            )
                        })                                                            
                    }   
                    </div>
            </div>               
            <input type="text" className="form-control" aria-label="Text input with dropdown button" style={stylin} value={target}>                
            </input>                            
        </div>
        
    )
}

export default SurveyDropDown