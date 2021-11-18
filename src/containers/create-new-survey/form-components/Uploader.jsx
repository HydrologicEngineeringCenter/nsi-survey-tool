import React from 'react'
import classes from "./Uploader.module.css"
import { useCallback, useMemo } from "react"
import { useDropzone } from 'react-dropzone'
import CSVMetaArrayReader from "../../../lib/data/CSVMetaArrayReader"
import { connect } from "redux-bundler-react"

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
      // read in stream is going to be in a different priority task queue,
      // tasks on the main thread won't be able to access data,
      // processing logic have to be in redux
      const surveyList = new CSVMetaArrayReader(file)
      surveyList.readFile(doStoreCreateSurveyElements)
      // surveyList.readFile(data => {
      //   const processor = new CSVMetaArrayProcessor(data)
      //   // rename fields
      //   const newNames = ['fdId', 'isControl']
      //   newNames.forEach((name, idx) => {
      //     processor.changePropertyByIndex(idx, name)
      //   })
      //   doStoreCreateSurveyElements(processor.data)
      // })
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

  return (
    <div className={classes.uploader}>
      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div>Drag and drop your csv file here.</div>
        </div>
      </section>
    </div>
  );
};

export default connect(
  'doStoreCreateSurveyElements',
  Uploader
)
