import React from 'react'

const SurveryTxtBox = (props) => {
    const fieldname = props.fieldName
    const event = props.event    
    const target = props.target     
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{fieldname}</span>
            </div>
            <input type="text" className="form-control" value={target} onChange={(e)=>handleChange(event, e)}/>
        </div>
    )
},
handleChange = (doEvent, e) => {
    console.log(e.target.value)
    doEvent(e.target.value);
}
export default SurveryTxtBox