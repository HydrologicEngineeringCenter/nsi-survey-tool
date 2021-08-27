import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {

  //  multiple classes
  return (
    <div className={`${classes.card} ${props.className}`}> 
      {props.children}
    </div>
  )
};

export default Card;