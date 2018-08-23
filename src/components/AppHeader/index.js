import * as React from 'react';
import { NavLink } from 'react-router-dom';

function AppHeader(props) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/runs">Runs</NavLink>      
          </li>

          <li>
            <NavLink to="/runs/new">New Run</NavLink>      
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
