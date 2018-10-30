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
      </nav>
    </header>
  );
}

export default AppHeader;
