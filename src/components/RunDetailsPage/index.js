import * as React from 'react';
import ApiClient from '../apiClient';
import { withRouter } from 'react-router-dom';
import DetailsSection from './DetailsSection';

class RunDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {details: {}};
  }

  componentDidMount() {
    ApiClient.get(`/runs/${this.props.match.params.id}/run.json`).then(response => this.setState({details: response}));
  }

  render() {
    return (
      <div className="page">
        <h4>Run '{this.props.match.params.id}' details:</h4>
        {Object.keys(this.state.details).map(detail => (
          <DetailsSection 
            data={this.state.details[detail]} 
            key={detail}
            name={detail}
          />
        ))}
      </div>
    )
  }
}

export default withRouter(RunDetailsPage);
