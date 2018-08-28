import * as React from 'react';
import ApiClient from '../apiClient';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

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
  Header: "Locale",
  accessor: "locale"
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
    ApiClient.get('/data/all_runs.json').then(response => this.setState({runs: response.runs}));
  }

  handleDelete = (id) => {
    ApiClient.delete(`/delete?${id}`);
    this.setState({runs: this.state.runs.filter(run => run.id !== id)});

  }

  _getColumns = () => [...TABLE_COLUMNS, {
      Header: "Actions",
      id: "action",
      accessor: data => data.id,
      Cell: row => (
        <div>
          <button onClick={() => this.handleDelete(row.value)}>
            <FontAwesomeIcon icon={faTrash} size="lg" /> Delete
          </button>

          <button>
            <Link to={{ pathname: `/runs/${row.value}/`}}>
              <FontAwesomeIcon icon={faEye} size="lg" /> View
            </Link>
          </button>
        </div>
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
