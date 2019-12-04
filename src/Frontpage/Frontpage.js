import * as React from 'react';
import './Frontpage.css';
import DisplayPlayers from '../DisplayPlayers/DisplayPlayers';

const Frontpage = (props) => (

        <div className="Frontpage">
            <header className="Frontpage-header">
                <h1>Football Coach Assistant</h1>
            </header>
            <DisplayPlayers/>
        </div>

);
export default Frontpage;

