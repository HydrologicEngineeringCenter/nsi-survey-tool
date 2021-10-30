import classes from "./Uploader.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
// import Button from "@material-ui/core/Button";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDropzone } from 'react-dropzone';
import CSVMetaArray from "../../../lib/data/CSVMetaArray";
import zip from "../../../utils/zip";

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};
{ { { } } }
const rejectStyle = {
  borderColor: '#ff1744'
};

// field names required in request body to backend
const requestProperties = ["fdId", "isControl"]

// https://www.digitalocean.com/community/tutorials/react-react-dropzone
const Uploader = (props) => {

  const { setElements } = props

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const surveyList = new CSVMetaArray(file)
      const names = surveyList.getOwnPropertyNames()

      // process data into format required for InsertSurveyElements request
      names.forEach((name, idx) => {
        surveyList.changeProperty(name, requestProperties[idx])
      })

      setElements(surveyList)
    })
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'application/vnd.ms-excel, .csv'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  // const thumbs = files.map(file => (
  //   <div key={file.name}>
  //     {file.type}
  //     <img
  //       src={file.preview}
  //       alt={file.name}
  //     />
  //   </div>
  // ));

  // // clean up
  // useEffect(() => () => {
  //   files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [files]);

  return (
    <div className={classes.uploader}>
      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div>Drag and drop your csv file here.</div>
        </div>
      </section>

      <aside>
      </aside>


      {/* <Button variant="contained">Upload!</Button> */}
      {/* <Button
        variant="contained"
        color="default"
        // className={classes.button}
        startIcon={<CloudUploadIcon />}
        component="label"
      >
        Upload
        <input type="file" hidden />
      </Button> */}

    </div>
  );
};

export default Uploader;
