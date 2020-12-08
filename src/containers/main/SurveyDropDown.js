import React from 'react'

const SurveyDropDown = (props) => {
    const ddName = props.ddName
    const vals = props.vals
    const event = props.event
    const target = props.target
    return(
        <div>
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{ddName}</button>
                <div className="dropdown-menu" id="damcatDD">
                {
                    vals.map((item,i) => {                        
                        return (
                            <button className="dropdown-item" type="button" key={i} onClick={() => event(item.DC)}>{item.DC}</button>
                        )
                    })                                                            
                }   
                </div>
            </div>  
            <input type="text" className="form-control" id="demo" aria-label="Text input with dropdown button" value={target}>                
            </input>
        </div>
        
    )
}

export default SurveyDropDown