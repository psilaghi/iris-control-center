import * as React from 'react';
import styled from 'styled-components';
import { Collapse, CardBody, Card } from 'reactstrap';
import TestItem from './TestItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const StyledDiv=styled.div`
  cursor: pointer;
`;

class TestCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleChange = (event) => {
    if (event.target.checked) {
      this.props.onChange(this.props.name, this.props.tests);
    } else {
      this.props.onChange(this.props.name, []);
    }
  }

  toggleCollapse = (event) => {
    if (event.target.type !== 'checkbox') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }

  handleTestSelection = (test, action) => {
    if (action === 'add') {
      this.props.onChange(this.props.name, [...this.props.selectedTests, test])
    } else {
      this.props.onChange(this.props.name, this.props.selectedTests.filter(item => item !== test));
    }
  }

  render() {
    return (
      <div>
        <StyledDiv onClick={this.toggleCollapse}>
          <input
            type="checkbox"
            checked={this.props.selectedTests.length === this.props.tests.length}
            onChange={this.handleChange}
          />
          <FontAwesomeIcon className="arrow-icon" icon={this.state.expanded ? faChevronDown : faChevronRight} />
          <span>
            {this.props.name}
          </span>
        </StyledDiv>

        <Collapse isOpen={this.state.expanded}>
            <Card>
              <CardBody>
                  {this.props.tests.map(test => (
                    <TestItem
                      key={test.name}
                      test={test}
                      checked={this.props.selectedTests.indexOf(test) !== -1}
                      onChange={this.handleTestSelection}
                    />
                  ))}
              </CardBody>
            </Card>
        </Collapse>
      </div>
    );
  }
}

export default TestCategory;
