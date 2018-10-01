import * as React from 'react';
import styled from 'styled-components';
import { Collapse, CardBody, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ExpandableContent from './ExpandableContent';

const Container = styled.div`
  padding-left: 20px;
  background-color: light-grey;
`

class DetailsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleCollapse = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const {data} = this.props;
    return (
      <div>
        <div onClick={this.toggleCollapse}>
          <FontAwesomeIcon className="arrow-icon" icon={this.state.expanded ? faChevronDown : faChevronRight} />
          <span>
            <i>{this.props.name}</i>
          </span>
        </div>

        <Collapse isOpen={this.state.expanded}>
          <Card>
            <CardBody>
              <ExpandableContent data={data} />
            </CardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}

export default DetailsSection;
