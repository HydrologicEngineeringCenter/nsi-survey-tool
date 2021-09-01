import classes from "./FunctionTitle.module.css";

const FunctionTitle = props => {
  return (
    <h1 className={classes.title}>{props.children}</h1>
  )
};

export default FunctionTitle;