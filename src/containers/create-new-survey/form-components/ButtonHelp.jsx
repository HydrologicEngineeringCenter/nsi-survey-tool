import SelectButton from "../../components/SelectButton/SelectButton";
import HelpSvg from "../../../resources/survey-splash/help_outline_black_24dp.svg";
import classes from "./ButtonHelp.module.css";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";
import Card from "../../components/UI/Card";

const ButtonHelp = (props) => {
  const { children } = props;

  return (
    <div className={classes.container}>
      <Button variant="contained">{children}</Button>
      {/* <img className={classes["vector"]} src={HelpSvg} /> */}
    </div>
  );
};

export default ButtonHelp;
