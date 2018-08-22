import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './style.css';

const tableColumns = [{
  Header: "ID",
  accessor: "id"
}, {
  Header: "Build",
  accessor: "build"
}, {
  Header: "Channel",
  accessor: "channel"
}, {
  Header: "Failed",
  accessor: "failed"
}, {
  Header: "Total",
  accessor: "total"
}, {
  Header: "Version",
  accessor: "version"
}];

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
      <div className="page">
        <h1>My runs</h1>
        <ReactTable
          data={this.state.runs}
          columns={tableColumns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )     
  }
}

export default MyRunsPage;
