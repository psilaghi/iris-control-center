import * as React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    if (event.target.type !== 'checkbox') {
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
          <FontAwesomeIcon className="arrow-icon" icon={this.state.expanded ? faChevronDown : faChevronRight} />
          <span>
            {this.props.test.name}
          </span>
        </div>
        <Collapse isOpen={this.state.expanded}>
          <Card>
            <CardBody>
              <h6>Details:</h6>
              {Object.keys(this.props.test).map(key => (
                <div className="details" key={key}> <i>{key}:</i> {this.props.test[key].toString()}</div>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default TestItem;