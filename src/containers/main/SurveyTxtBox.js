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
            <input type="text" className="form-control" onChange={(e)=>handleChange(props, e)}/>
        </div>
    )
},
handleChange = (props, e) => {
    console.log(e.target.value)   
    props.event(e.target.value, props.targetField, props.validator);
}/*,style={styler(props)}
styler = (props) =>{
    if(props.isInValid){
        return{
            backgroundcolor: "#ffdddd"
        }
    }else{
        return{
            backgroundcolor: "#ddffdd"
        }
    }
}*/
export default SurveryTxtBox