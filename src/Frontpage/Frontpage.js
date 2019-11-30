import * as React from 'react';
import './Frontpage.css';
import DisplayPlayers from '../components/DisplayPlayers';


const Frontpage = (props) => {

    return (
        <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
        </header>

          <DisplayPlayers/>
      </div>
  );
};

export default Frontpage;
