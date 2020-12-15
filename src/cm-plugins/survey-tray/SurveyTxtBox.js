import React from 'react'

const SurveryTxtBox = (props) => {
    const fieldname = props.fieldName
    // const event = props.event  
    //const validator = props.validator
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{fieldname}</span>
            </div>
            <input type="text" style={styler(props)} className="form-control" onChange={(e)=>handleChange(props, e)} value={props.target}/>
        </div>
    )
},
handleChange = (props, e) => {
    console.log(e.target.value)   
    props.event(e.target.value, props.targetField, props.validator);
},
styler = (props) =>{
    if(props.isInValid){
        return {border: '5px solid red'}
    }else{
        return {border: '1px solid #ced4da'}
    }
}
export default SurveryTxtBox