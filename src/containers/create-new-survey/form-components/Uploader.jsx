import classes from "./Uploader.module.css";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Uploader = (props) => {
  return (
    <div className={classes.uploader}>
      {/* <Button variant="contained">Upload!</Button> */}
      <Button
        variant="contained"
        color="default"
        // className={classes.button}
        startIcon={<CloudUploadIcon />}
        component="label"
      >
        Upload
        <input type="file" hidden />
      </Button>
    </div>
  );
};

export default Uploader;
