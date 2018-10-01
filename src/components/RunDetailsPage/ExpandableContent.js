import * as React from 'react';
import DetailsSection from './DetailsSection';

const ExpandableContent= (props) => {
  const {data} = props;
  return (
    <div>
      {Object.keys(data||{}).map(key => (
        <div key={key} className="details">
          {(typeof(data[key]) !== "object" || data[key] == null) &&
            <span><i>{`${key}: `}</i>{`${data[key]}`}</span>
          }
          {typeof(data[key]) === "object" && data[key] != null &&
            <DetailsSection 
              data={data[key]} 
              name={isFinite(key) && data[key]['name'] ? data[key]['name'] : key}
              key={key} 
            />
          }
        </div>
      ))}
    </div>
  )
}

export default ExpandableContent;
