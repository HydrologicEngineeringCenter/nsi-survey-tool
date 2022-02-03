import { Fragment } from "react"
import { DataGrid } from '@mui/x-data-grid'

import { connect } from "redux-bundler-react"
import classes from "./ElementTable.module.css"

const ElementTable = props => {
  const { survey_elements } = props
  const columns = [
    { field: 'fdId', headerName: 'fdId', width: 150 },
    { field: 'surveyOrder', headerName: 'order', width: 150 },
    { field: 'isControl', headerName: 'control', width: 150 },
  ]

  return (
    <Fragment>
      <div style={{ height: 370, width: '100%' }}>
        <DataGrid
          rows={survey_elements}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={r => r.fdId}
        />
      </div>
    </Fragment>
  );
}

export default connect(
  "selectSurvey_elements",
  ElementTable
)
