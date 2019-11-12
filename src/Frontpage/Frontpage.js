import * as React from 'react';
import './Frontpage.css';
import DisplayDate from '../DisplayDate/DisplayDate'

const Frontpage = (props) => {
    return (
        <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
          <p>
            Welcome to your application!
          </p>
          <DisplayDate/>
        </header>
      </div>
    );
};

export default Frontpage;
