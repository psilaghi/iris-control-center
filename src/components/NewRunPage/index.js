import * as React from 'react';
import ApiClient from '../apiClient';
import './style.css';

const LABELS = {
  email: 'Email',
  firefox: 'Channel',
  highlight: 'Highlight',
  level: 'Debug level',
  locale: 'Locale',
  mouse: 'Mouse speed',
  override: 'Override',
  port: 'Port',
  report: 'Report',
  rerun: 'Rerun',
  save: 'Save'
};

class NewRunPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {},
      tests: {},
      newRun: {}
    };
  }

  componentDidMount() {
    ApiClient.get('/data/all_args.json').then(response => {
      const defaults = {};
      for (let key in response) {
        defaults[key] = (response[key].type === 'bool' ? (response[key].default === 'true') : response[key].default);
      }
      this.setState({
        args: response,
        newRun: defaults
      });
    });
    ApiClient.get('/data/all_tests.json').then(response => this.setState({tests: response}));
  }

  handleChange = (event) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [event.target.name]: event.target.value
      }
    });
  }
  
  handleCheckboxChange = (event) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [event.target.name]: event.target.checked ? true : false
      }
    });
  }
  
  handleSubmit = () => {
    // ApiClient.post('url',this.state.newRun);
    console.log(this.state.newRun);
  }

  handleCancel = () => {
    ApiClient.get('/cancel');
  }



  render() {
    return (
      <div className="page">
        <h1>Start new run</h1>
        <div className="grid-top">
          <button type="button" className="btn header-button" onClick={this.handleSubmit}>Go</button>
          <button type="button" className="btn header-button" onClick={this.handleCancel}>Cancel</button>
        </div>

        <div className="grid">
          <div className="grid-left">
            {this.state.args.firefox && (
              <div className="form-group row">
                <label htmlFor="firefox" className="col-sm-2">{LABELS.firefox}</label>
                <div className="col-sm-2">
                  <select
                    className="form-control form-control-sm"
                    id="firefox"
                    name="firefox"
                    value={this.state.newRun.firefox}
                    onChange={this.handleChange}
                  >
                    {this.state.args.firefox.value.map(value =>
                      (<option key={value}>{value}</option>)
                    )}
                  </select>
                </div>
              </div>
            )}

            {this.state.args.level && (
              <div className="form-group row">
                <label htmlFor="level" className="col-sm-2">{LABELS.level}</label>
                <div className="col-sm-2">
                  <select
                    className="form-control form-control-sm"
                    id="level"
                    name="level"
                    value={this.state.newRun.level}
                    onChange={this.handleChange}
                  >
                    {this.state.args.level.value.map(value =>
                      (<option key={value}>{value}</option>)
                    )}
                  </select>
                </div>
              </div>
            )}

            {this.state.args.locale && (
              <div className="form-group row">
                <label htmlFor="locale" className="col-sm-2">{LABELS.locale}</label>
                <div className="col-sm-2">
                  <select
                    className="form-control form-control-sm"
                    id="locale"
                    name="locale"
                    value={this.state.newRun.locale}
                    onChange={this.handleChange}
                  >
                    {this.state.args.locale.value.map(value =>
                      (<option key={value}>{value}</option>)
                    )}
                  </select>
                </div>
              </div>
            )}

            {this.state.args.mouse && (
              <div className="form-group row">
                <label htmlFor="mouse" className="col-sm-2">{LABELS.mouse}</label>
                <div className="col-sm-2">
                  <select
                    className="form-control form-control-sm"
                    id="mouse"
                    name="mouse"
                    value={this.state.newRun.mouse}
                    onChange={this.handleChange}
                  >
                    {this.state.args.mouse.value.map(value =>
                      (<option key={value}>{value}</option>)
                    )}
                  </select>
                </div>
              </div>
            )}

            {this.state.args.port && (
              <div className="form-group row">
                <label htmlFor="port" className="col-sm-2">{LABELS.port}</label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="port"
                    name="port"
                    value={this.state.newRun.port}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid-right">
            {this.state.args.email && (
              <div className="checkbox">
                <label>
                  <input
                    name="email"
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.newRun.email}
                    onChange={this.handleCheckboxChange}
                  />
                  {LABELS.email}
                </label>
              </div>
            )}

            {this.state.args.highlight && (
              <div className="checkbox">
                <label>
                  <input
                    name="highlight"
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.newRun.highlight}
                    onChange={this.handleCheckboxChange}
                  />
                  {LABELS.highlight}
                </label>
              </div>
            )}

            {this.state.args.override && (
              <div className="checkbox">
                <label>
                  <input
                    name="override"
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.newRun.override}
                    onChange={this.handleCheckboxChange}
                  />
                  {LABELS.override}
                </label>
              </div>
            )}

            {this.state.args.report && (
              <div className="checkbox">
                <label>
                  <input
                    name="report"
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.newRun.report}
                    onChange={this.handleCheckboxChange}
                  />
                  {LABELS.report}
                </label>
              </div>
            )}

            {this.state.args.save && (
              <div className="checkbox">
                <label>
                  <input
                    name="save"
                    className="form-check-input"
                    type="checkbox"
                    checked={this.state.newRun.save}
                    onChange={this.handleCheckboxChange}
                  />
                  {LABELS.save}
                </label>
              </div>
            )}
          </div>

          <div className="grid-bottom">
          all tests section
          </div>
        </div>


      </div>
    )
  }
}

export default NewRunPage;
