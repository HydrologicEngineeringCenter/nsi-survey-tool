import React from 'react'
import classes from "./Uploader.module.css"
import { useCallback, useMemo } from "react"
import { useDropzone } from 'react-dropzone'
import CSVMetaArrayReader from "../../../lib/data/CSVMetaArrayReader"
import { connect } from "redux-bundler-react"
import { DropzoneArea } from "material-ui-dropzone"

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

const rejectStyle = {
  borderColor: '#ff1744'
};

// https://www.digitalocean.com/community/tutorials/react-react-dropzone
const Uploader = (props) => {

  const { doStoreCreateSurveyElements } = props

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      // read-in stream is going to be in a different priority task queue,
      // tasks on the main thread won't be able to access data,
      // processing logic have to be in redux
      const surveyList = new CSVMetaArrayReader(file)
      surveyList.readFile(doStoreCreateSurveyElements)
    })
  }, []);

  const onDelete = _ => {
    doStoreCreateSurveyElements([])
  }

  return (
    <div className={classes.uploader}>
      <DropzoneArea
        acceptFiles={["application/vnd.ms-excel"]}
        onChange={onDrop}
        onDelete={onDelete}
      />
    </div>
  );
};

export default connect(
  'doStoreCreateSurveyElements',
  Uploader
)
