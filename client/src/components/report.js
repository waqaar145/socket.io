import React from 'react'
import {Button} from 'reactstrap'

const SingleReport = ({report}) => {
  return (
    <tr>
      <td>{report.dish.value}</td>
      <td>{report.createdTillNow}</td>
      <td>{report.predicted_value}</td>
    </tr>
  )
}

export default SingleReport;
