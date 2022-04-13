import React from 'react';
import { connect } from 'redux-bundler-react';
import mapper from '../../../resources/GeoFDA_Icon.ico';
import '../../main/main.css';
import classes from './NavBar.module.css';
import cwbiLogo from "../../../resources/CWBI_Logo_45x45_compressed.png";

function NavBar(props) {

  const { authFullname: userName } = props;
  const base = process.env.REACT_APP_HOMEPAGE

  return (
    <nav className={`navbar navbar=expand-lg navbar-dark nv-bg`}>

      <div className={`${classes['float-left']} "nav float-left"`}>
        <a href={"/" + base}><img src={mapper} alt="NSI LOGO" style={{ width: '45px' }} /> </a>
        <a className='navbar-brand' href={"/" + base} style={{ paddingLeft: "15px", fontSize: '25px' }}><b>NSI Survey Tool</b></a>
      </div>

      <div className="nav pull-right">
        <div className={`${classes['flex-ac']} ${classes['user-name']}`}>
          {userName}
        </div>
        <img className={classes["cwbi-logo"]} title="Powered By Civil Works Business Intelligence" src={cwbiLogo} alt="CWBI LOGO" />
      </div>

    </nav>
  )
}
export default connect(
  'selectAuthFullname',
  NavBar
);
