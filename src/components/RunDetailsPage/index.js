import * as React from 'react';
import ApiClient from '../apiClient';
import { withRouter } from 'react-router-dom';
import DetailsSection from './DetailsSection';
import { NavLink } from 'react-router-dom';

class RunDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {details: {}};
  }

  componentDidMount() {
    ApiClient.get(`/runs/${this.props.match.params.id}/run.json`).then(response => this.setState({details: response}));
  }

  render() {
    const {meta} = this.state.details
    const failedCategories = meta ? Object.keys(this.state.details.meta.failed_tests) : []

    return (
      <div className="page">
        <NavLink to="/index">&lt; Back to Index</NavLink>
        <br />
        <br />
        <h4>Run '{this.props.match.params.id}' details:</h4>
        {this.state.details.meta && (
          <div className="align">
            <div><b><i>Pass/total tests:</i></b> {this.state.details.meta.passed}/{this.state.details.meta.total}</div>
            <div><b><i>Number of failures:</i></b> {this.state.details.meta.failed}</div>
            <div><b><i>Duration of run:</i></b> {this.state.details.meta.total_time}</div>
            <div><b><i>Firefox version:</i></b> {this.state.details.meta.fx_version}</div>
            <div><b><i>Channel:</i></b> {this.state.details.meta.channel}</div>
            <div><b><i>Locale:</i></b> {this.state.details.meta.locale}</div>
            <div><b><i>Build ID:</i></b> {this.state.details.meta.fx_build_id}</div>
            <div><b><i>Failed tests:</i></b> 
              <ul className="styled-ul">
                {Object.keys(this.state.details.meta.failed_tests).map(item => (
                  <li key={item}>
                    <div>{item}</div>
                    <ul>
                      {this.state.details.meta.failed_tests[item].map(test => (
                        <li key={test}>{test}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {Object.keys(this.state.details).map(detail => (
          <DetailsSection 
            data={this.state.details[detail]} 
            key={detail}
            name={detail}
            failedCategories={failedCategories || []}
          />
        ))}
      </div>
    )
  }
}

export default withRouter(RunDetailsPage);
