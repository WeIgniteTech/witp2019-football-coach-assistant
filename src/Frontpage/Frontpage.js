import * as React from 'react';
import './Frontpage.css';
import DisplayPlayers from '../DisplayPlayers/DisplayPlayers';

const Frontpage = (props) => {

  return (
    <div className="Frontpage">
      <header className="Frontpage-header">
      <img src={props.logo} className="Frontpage-logo" alt="logo" /> 
        <h1>
            Football Coach Assistant
        </h1>
      </header>
      <DisplayPlayers />
    </div>
  );
};

export default Frontpage;
