import * as React from 'react';
import './Frontpage.css';
import DisplayPlayers from '../DisplayPlayers/DisplayPlayers';
import Connect from "../Connect/Connect"

const Frontpage = (props) => {
let players=Connect("http://localhost:3000/api/players");

    return (
        <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
        </header>

          <DisplayPlayers Players={players}/>
      </div>
  );
};

export default Frontpage;
