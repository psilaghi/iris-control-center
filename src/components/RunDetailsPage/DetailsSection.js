import * as React from 'react';
import { Collapse, Card } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ExpandableContent from './ExpandableContent';
import styled from 'styled-components';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import './style.css';

const StyledDiv=styled.div`
  color: ${props => props.error ? 'red' : 'black'};
  cursor: pointer;
`;

const StyledCardBody = styled(Card)`
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-top: .5rem;
  padding-bottom: .5rem;
`;

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
    const {data, name} = this.props;
    const showCarousel = name === 'debug_images';
    let images = [];
    var path = this.props.imagesPath;
    
   
    if(showCarousel){
      var new_path = path.replace(/\\/gi, '/')+'/';
      var final_path = new_path.substring(new_path.indexOf('/runs'), new_path.length);

      data.forEach(item => {
        images.push({
          original: final_path+item,
          thumbnail: final_path+item,
        });
      });
    }
    
    return (
      <div>
        <StyledDiv onClick={this.toggleCollapse} error={this.props.hasError}>
          <FontAwesomeIcon className="arrow-icon" icon={this.state.expanded ? faChevronDown : faChevronRight} />
          <span><i>{name}</i></span>
        </StyledDiv>

        <Collapse isOpen={this.state.expanded}>
          <Card>
            <StyledCardBody>
              {showCarousel 
                ? <ImageGallery items={images} className="image-size" />
                : <ExpandableContent
                    data={data}
                    failedCategories = {this.props.failedCategories}
                  />
              }
            </StyledCardBody>
          </Card>
        </Collapse>
      </div>
    )
  }
}

export default DetailsSection;
