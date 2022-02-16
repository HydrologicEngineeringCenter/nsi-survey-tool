import React from 'react'
import classes from "./Uploader.module.css"
import CSVMetaArrayReader from "../../../lib/data/CSVMetaArrayReader"
import { connect } from "redux-bundler-react"
import { DropzoneArea } from "material-ui-dropzone"

const Uploader = (props) => {

  const { doElement_storeElements } = props

  const onDrop = files => {
    // Uploader is limiting loaded files to 1 so index 0 is always valid
    if (files.length > 0) {
      const surveyList = new CSVMetaArrayReader(files[0])
      surveyList.readFile(data => {
        doElement_storeElements(data)
      })
    }
  }

  const onDelete = _ => {
    doElement_storeElements([])
  }

  return (
    <div className={classes.uploader}>
      <DropzoneArea
        acceptFiles={["application/vnd.ms-excel"]}
        onChange={onDrop}
        onDelete={onDelete}
        filesLimit={1}
      />
    </div>
  );
};

export default connect(
  'doElement_storeElements',
  'doElement_shouldProcessRawData',
  Uploader
)
