import classes from "./Button.module.css";

const Button = (props) => {
  const { vector, text } = props;

  return (
    <div className={`${classes["button"]} ${classes["smart-layers-pointer"]}`}>
      <div className={`${classes["overlap-group"]}`}>
        <div
          className={`${classes["background"]} ${classes["boder-1px-black"]}`}
        >
          <img className={classes["vector"]} src={vector} />
          <h1
            className={`${classes["text-1"]} ${classes["valign-text-middle"]}`}
          >
            {text}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Button;
