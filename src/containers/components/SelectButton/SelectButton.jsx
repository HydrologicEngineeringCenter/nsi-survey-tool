import classes from "./SelectButton.module.css";

const SelectButton = (props) => {
  const { children } = props;

  return (
    <div className={classes["button"]}>
      <div className={`${classes["label"]} ${classes["valign-text-middle"]}`}>
        {children}
      </div>
    </div>
  );
};

export default SelectButton;
