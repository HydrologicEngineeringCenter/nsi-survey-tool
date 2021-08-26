import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../../resources/GeoFDA_Icon.ico';
import '../../main/main.css';
import classes from './NavBar.module.css';


function NavBar(props){

    const{authUserName:userName} = props;

    return (
        <nav className={`navbar navbar=expand-lg navbar-dark nv-bg`}>
            <a href="/nsi-survey" className={`${classes['float-left']} "float-left"`}>
                <img src={mapper} alt="NSI LOGO" style={{width:'35px'}}/>
                <a className={classes['navbar-brand']}>NSI Survey Tool</a>           
            </a>
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