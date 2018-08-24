import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TABLE_COLUMNS = [{
  Header: "ID",
  accessor: "id",
  Cell: row => (<Link to={{ pathname: `/runs/${row.value}/`}}>{row.value}</Link>)
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

class RunsPage extends React.Component {
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

  handleDelete = (id) => {
    ApiClient.delete(`/delete?id=${id}`);
    this.setState({runs: this.state.runs.filter(run => run.id !== id)});

  }

  _getColumns = () => [...TABLE_COLUMNS, {
      Header: "Delete",
      id: "action",
      accessor: data => data.id,
      Cell: row => (
        <button onClick={() => this.handleDelete(row.value)}>
          <FontAwesomeIcon icon={faTrash} size="lg" /> Delete
        </button>
      )
    }
  ]
   
  render() {
    return ( 
      <div className="page">
        <h1>My runs</h1>
        <ReactTable
          data={this.state.runs}
          columns={this._getColumns()}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    )     
  }
}

export default RunsPage;
