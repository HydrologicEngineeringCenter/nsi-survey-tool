import React from 'react';
import classes from "./ButtonHelp.module.css";
import Button from "@material-ui/core/Button";

const ButtonHelp = (props) => {
  const { children } = props;

  return (
    <div className={classes.container}>
      <Button variant="contained" onClick={props.onClick}>{children}</Button>
      {/* <img className={classes["vector"]} src={HelpSvg} /> */}
    </div>
  );
};

export default ButtonHelp;
