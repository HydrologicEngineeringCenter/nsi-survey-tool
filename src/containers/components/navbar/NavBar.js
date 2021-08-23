import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../../resources/GeoFDA_Icon.ico';
import '../../main/main.css';


function NavBar(props){

    const{authUserName:userName} = props;

    return (
        <nav className="navbar navbar=expand-lg navbar-dark nv-bg">
            <div className="float-left">
                <a href = "/"><img src={mapper} alt="NSI LOGO" style={{width:'45px'}}/></a>
                <a className="navbar-brand" href="/" style={{paddingLeft:"15px", fontSize:'25px'}}><b>NSI Survey Tool</b></a>           
            </div>
            <div>
                {userName}
            </div>
        </nav>
    )
}
export default connect(
    'selectAuthUserName',
    NavBar
);