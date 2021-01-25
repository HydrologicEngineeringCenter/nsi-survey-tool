import React from 'react'

const igstyle={
    display:"flex"
}

const SurveryTxtBox = (props) => {
    const fieldname = props.fieldName
    const stylin = props.stylin
    // const event = props.event  
    //const validator = props.validator
    return (        
        <div style={{...stylin,...igstyle}}>            
            <div>
                <span className="input-group-text" style ={stylin}>{fieldname}</span>
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
        return {...props.stylin, border: '5px solid red'}
    }else{
        return {...props.stylin}
        }
    }

export default SurveryTxtBox