import * as React from 'react';
import ApiClient from '../apiClient';

class MyRunsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {runs: []};
  }

  componentDidMount() {
    ApiClient.get('/data/runs.json').then(response => {
      let parsedResponse = [];
      Object.keys(response).map(id => parsedResponse.push({id: id, ...response[id]}));
      this.setState({runs: parsedResponse});
    });
  }
  
  render() {
    return ( 
      <div>
        <h1>My runs</h1>
        <div>
          {this.state.runs.map(run => (
            <div key={run.id}>
              {`${run.id} --- build: ${run.build} --- channel: ${run.channel} --- failed: ${run.failed} --- total: ${run.total} --- version: ${run.version}`}
            </div>
          ))}
        </div>
      </div>
    )     
  }
}

export default MyRunsPage;
