import * as React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

class TestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleChange = (event) => {
    if (event.target.checked) {
      this.props.onChange(this.props.test, 'add');
    } else {
      this.props.onChange(this.props.test, 'remove');
    }
  }

  toggleCollapse = (event) => {
    if (event.target === event.currentTarget) {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }

  render() {
    return (
      <div>
        <div onClick={this.toggleCollapse}>
          <input
            type="checkbox"
            checked={this.props.checked}
            onChange={this.handleChange}
          />
          {this.props.test.name}
        </div>
        <Collapse isOpen={this.state.expanded}>
          <Card>
            <CardBody>
              <h6>Details:</h6>
              {Object.keys(this.props.test).map(key => (
                <div key={key}>{key}: {this.props.test[key].toString()}</div>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default TestItem;