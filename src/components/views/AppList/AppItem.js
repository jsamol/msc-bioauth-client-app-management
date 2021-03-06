import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import pathUtils from '../../../utils/pathUtils';

const AppKeys = React.lazy(() => import('../AppKeys'));

const line = {
  labels: [],
  datasets: [
    {
      label: 'BioAuth Usage',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(32, 168, 216, 0.4)',
      borderColor: 'rgba(32, 168, 216, 1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
  },
  maintainAspectRatio: false,

};

const propTypes = {
  app: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    appId: PropTypes.string.isRequired,
    appSecret: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  isOpened: PropTypes.bool.isRequired,
};
const defaultProps = {};

class AppItem extends Component {

  constructor(props) {
    super(props);

    this.toggleSecretVisibility = this.toggleSecretVisibility.bind(this);
    this.redirectToAppDetails = this.redirectToAppDetails.bind(this);

    this.state = {
      appSecretShown: false,
    };
  }

  toggleSecretVisibility() {
    const prevState = this.state.appSecretShown;
    this.setState({
      appSecretShown: !prevState,
    });
  }

  redirectToAppDetails() {
    this.props.history.push(pathUtils.getAppDetailsPath(this.props.app));
  }

  render() {
    return (
      <div>
        <Row>
          <Col xl="6">
            <Row>
              <Col>
                {this.props.app.description && <p className="text-justify">{this.props.app.description}</p>}
              </Col>
            </Row>
            <Row>
              <Col sm="8">
                <AppKeys appId={this.props.app.appId} appSecret={this.props.app.appSecret}/>
              </Col>
            </Row>
            <Row>
              <Col lg="8" md="12" className="mt-4 mb-4">
                <div className='d-flex justify-content-center'>
                  <Button color="ghost-primary" onClick={this.redirectToAppDetails}>More Info</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xl="6">
            {this.props.isOpened &&
            <div className="chart-wrapper">
              <Line data={line} options={options}/>
            </div>
            }
          </Col>
        </Row>
      </div>
    );
  }
}

AppItem.propTypes = propTypes;
AppItem.defaultProps = defaultProps;

export default withRouter(AppItem);
