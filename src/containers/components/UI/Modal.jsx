import React from 'react';
import { Fragment } from "react";
import classes from "./Modal.module.css";
// import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      {props.children}
      {/* <div className={classes.content}></div> */}
    </div>
  );
};

// const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
