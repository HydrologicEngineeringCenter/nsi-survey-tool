import React from 'react';
import Button from '@material-ui/core/Button';

const helpLink = process.env.REACT_APP_HELP_LINK

const HelpButton = (props) => {
  return (
    <Button href={`${helpLink}`} variant="contained" > Help</Button >
  );
};

export default HelpButton;
