import SelectButton from "../../components/SelectButton/SelectButton"
import HelpSvg from "../../../resources/survey-splash/help_outline_black_24dp.svg"
import classes from "./ButtonHelp.module.css";

const ButtonHelp = props => {

  const {children} = props

  return (
    <div className={classes.container}>
      <SelectButton>{children}</SelectButton>
      <img className={classes["vector"]} src={HelpSvg} />
    </div>
  );
};

export default ButtonHelp;