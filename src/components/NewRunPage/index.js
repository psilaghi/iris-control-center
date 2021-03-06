import * as React from 'react';
import ApiClient from '../apiClient';
import './style.css';
import {
  Checkbox,
  Select
} from '../inputs';
import TestCategory from '../TestCategory';

const DropdownItems = [
 'firefox',
 'locale',
 'mouse'
];

const CheckboxItems = [
 'email',
 'highlight',
 'override',
 'report',
 'save'
]

class NewRunPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {},
      tests: {},
      newRun: {
        tests: {}
      }
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
        newRun: {
          ...this.state.newRun,
          ...defaults
        }
      });
    });
    ApiClient.get('/data/all_tests.json').then(response => this.setState({tests: response}));
  }

  handleChange = (name, value) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [name]: value
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
    ApiClient.post('/go',this.state.newRun);
  }

  handleCancel = () => {
    ApiClient.get('/cancel');
  }

  handleTestSelection = (categoryName, selectedTests) => {
    let tests;
    if (!selectedTests.length) {
      tests = {
        ...this.state.newRun.tests
      };
      delete tests[categoryName];
    } else {
      tests = {
        ...this.state.newRun.tests,
        [categoryName]: selectedTests
      }
    }

    this.setState({
      newRun: {
        ...this.state.newRun,
        tests: tests
      }
    });
  }

  handleSelectAll = (checked) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        tests: checked ? this.state.tests : {}
      }
    });
  }

  render() {
    return (
      <div className="page">
        <h4>Start new run:</h4>
        <div className="grid">
          <div className="grid-left">
            <button type="button" className="btn btn-primary header-button" onClick={this.handleSubmit}>Go</button>
            <button type="button" className="btn btn-secondary header-button" onClick={this.handleCancel}>Cancel</button>
          </div>

          <div className="grid-center">
            {DropdownItems.map(item =>
              this.state.args[item] && (
                <Select
                  key={item}
                  label={this.state.args[item].label}
                  name={item}
                  options={this.state.args[item].value}
                  value={this.state.newRun[item]}
                  onChange={this.handleChange}
                />
              )
            )}
          </div>

          <div className="grid-right">
            {CheckboxItems.map(item =>
              this.state.args[item] && (
                <Checkbox
                  key={item}
                  label={this.state.args[item].label}
                  name={item}
                  checked={this.state.newRun[item]}
                  onChange={this.handleChange}
                />
              )
            )}
          </div>

          <div className="grid-bottom">
            <Checkbox
              label="Select all tests"
              onChange={this.handleSelectAll}
            />
            {Object.keys(this.state.tests).map(categoryName => (
              <TestCategory
                key={categoryName}
                name={categoryName}
                tests={this.state.tests[categoryName] || []}
                onChange={this.handleTestSelection}
                selectedTests={this.state.newRun.tests[categoryName] || []}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default NewRunPage;
