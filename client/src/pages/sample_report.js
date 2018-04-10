import React, {Component} from 'react'
import FaasosNav from './../components/nav'
import {Container, Row, Col, Table} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getDishNames} from './../actions/action_dish'
import SingleReport from './../components/report'

class SampleReport extends Component {

  componentDidMount () {
    this.props.getDishNames()
  }

  render () {

    const {reports} = this.props

    let report;
    if (reports.length > 0) {
      report = reports.map((report) => {
        return (
          <SingleReport
            key={report._id}
            report={report}
          />
        )
      })
    }

    return (
      <div>
        <FaasosNav />
        <Container>
          <h5>Sample report</h5>
          <br/><br/>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Table>
                <thead>
                  <tr>
                    <th>Dish name</th>
                    <th>Produced</th>
                    <th>Predicted</th>
                  </tr>
                </thead>
                <tbody>
                  {report}
                </tbody>
              </Table>

            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

SampleReport.propTypes = {
  getDishNames: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    reports: state.dishes
  }
}

export default connect(mapStateToProps, {getDishNames})(SampleReport);
