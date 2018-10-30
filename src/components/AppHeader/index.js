import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledH1=styled.h1`
  text-align: center;
`;

function AppHeader(props) {
  return (
    <header>
      <nav>
        <StyledH1>Iris Control Center</StyledH1>
        {/* <ul>
          <li>
            <NavLink to="/runs">Runs</NavLink>      
          </li>

          <li>
            <NavLink to="/runs/new">New Run</NavLink>      
          </li>
        </ul> */}
      </nav>
    </header>
  );
}

export default AppHeader;
