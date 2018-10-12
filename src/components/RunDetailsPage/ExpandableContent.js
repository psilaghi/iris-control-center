import * as React from 'react';
import DetailsSection from './DetailsSection';
import styled from 'styled-components';

const StyledSpan=styled.span`
  color: ${props => props.error ? 'red' : 'black'};
  margin-left: 10px;
  line-height: 30px;
`;

const isCategoryWithFailingTest = (categoryData) => {
  if (!Array.isArray(categoryData)) {
    return false;
  }
  const failedTest = categoryData.find (item => item['result'] === 'FAILED');
  return failedTest !== undefined ? true : false;
}

const ExpandableContent= (props) => {
  const {data} = props;
  return (
    <div>
      {Object.keys(data||{}).map(key => (
        <div key={key} className="details">
          {(typeof(data[key]) !== "object" || data[key] == null) &&
            <StyledSpan error={key === 'result' && data[key] === 'FAILED'}>
							<i>{`${key}: `}</i>{`${data[key]}`}
						</StyledSpan>
          }
          {typeof(data[key]) === "object" && data[key] != null &&
            <DetailsSection 
              data={data[key]} 
              name={isFinite(key) && data[key]['name'] ? data[key]['name'] : key}
              key={key} 
              hasError={data[key]['result']==='FAILED' || isCategoryWithFailingTest(data[key])}
              imagesPath={key==='debug_images' ? data['debug_image_directory'] : ''}
            />
          }
        </div>
      ))}
    </div>
  )
}

export default ExpandableContent;
