import * as React from 'react';

class Checkbox extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event.target.name, event.target.checked ? true : false);
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            {...this.props}
            className="form-check-input"
            type="checkbox"
            onChange={this.handleChange}
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
