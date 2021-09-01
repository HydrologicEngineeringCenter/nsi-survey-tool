import classes from "./NameInput.module.css";

const NameInput = () => {
  return (
    <div className={classes["name-container"]}>
      <div className={classes["input-label"]}>Survey Name</div>
      <input
        className={classes["text-block"]}
        placeholder=""
        type="text"
        required
      ></input>
    </div>
  );
};

export default NameInput;
