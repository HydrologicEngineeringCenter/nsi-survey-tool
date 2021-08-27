import classes from "./Title.module.css";

const Title = (props) => {
  const { text1, text2 } = props;

  return (
    <div className={classes.title}>
      <div className={classes["overlap-group"]}>
        <div className={classes["background"]} />
        <div className={classes["background-1"]} />
        <div className={classes["intersect-rec"]} />
        <h1 className={`${classes["title-0"]} ${classes["valign-text-middle"]} ${classes["lato-bold-coffee-80px"]}`}>SURVEY</h1>
        <h1 className={`${classes["title-1"]} ${classes["valign-text-middle"]} ${classes["lato-bold-coffee-80px"]}`}>TOOLS</h1>
      </div>
    </div>
  );
};

export default Title;
