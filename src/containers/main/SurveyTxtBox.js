import React from 'react'

const SurveryTxtBox = (props) => {
    const fieldname = props.fieldName
    const event = props.event    
    const validator = props.validator     
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{fieldname}</span>
            </div>
            <input type="text" className="form-control" onBlur={(e) => handleChange(event, validator, e)}/>
        </div>
    )
},
handleChange = (doEvent, validator, e) => {
    console.log(e.target.value)
    if (!validator(e.target.value)) {
        doEvent(e.target.value);
    }
}
export default SurveryTxtBox